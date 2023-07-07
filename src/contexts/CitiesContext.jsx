import { createContext, useCallback, useEffect, useReducer } from 'react';
import {
  getCities,
  getCity as getCityApi,
  deleteCity as deleteCityApi,
  addCity,
  deleteAllCities as deleteAllCitiesApi,
  createSampleCities as createSampleCitiesApi,
} from '../services/apiCities';

const CitiesContext = createContext();

const initialState = {
  cities: [],
  currentCity: {},
  isLoading: false,
  error: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };

    case 'cities/loaded':
      return { ...state, isLoading: false, cities: action.payload };

    case 'city/created':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case 'city/deleted':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };

    case 'city/wipe':
      return {
        ...state,
        cities: [],
        currentCity: {},
        isLoading: false,
      };

    case 'city/loaded':
      return { ...state, isLoading: false, currentCity: action.payload };

    case 'rejected':
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error('Unknow action type!');
  }
}

function CitiesProvider({ children }) {
  const [{ cities, currentCity, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    (async () => {
      try {
        dispatch({ type: 'loading' });
        const data = await getCities();
        dispatch({ type: 'cities/loaded', payload: data });
      } catch (error) {
        dispatch({
          type: 'rejected',
          payload: 'There was an error when loading cities!',
        });
      }
    })();
  }, []);

  const getCity = useCallback(
    async function (id) {
      if (Number(id) === currentCity.id) return;
      try {
        dispatch({ type: 'loading' });
        const data = await getCityApi(id);
        dispatch({ type: 'city/loaded', payload: data });
      } catch (error) {
        dispatch({
          type: 'rejected',
          payload: 'There was an error when loading city!',
        });
      }
    },
    [currentCity.id]
  );

  async function createCity(newCity) {
    try {
      dispatch({ type: 'loading' });
      const data = await addCity(newCity);
      dispatch({ type: 'city/created', payload: data });
    } catch (error) {
      dispatch({
        type: 'rejected',
        payload: 'There was an error when creating city!',
      });
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: 'loading' });
      await deleteCityApi(id);
      dispatch({ type: 'city/deleted', payload: id });
    } catch (error) {
      dispatch({
        type: 'rejected',
        payload: 'There was an error when deleting city!',
      });
    }
  }

  async function deleteAllCities() {
    try {
      dispatch({ type: 'loading' });
      await deleteAllCitiesApi();
      dispatch({ type: 'city/wipe' });
    } catch (error) {
      dispatch({
        type: 'rejected',
        payload: 'There was an error when deleting city!',
      });
    }
  }

  async function createSampleCities(cities) {
    try {
      dispatch({ type: 'loading' });
      const data = await createSampleCitiesApi(cities);
      dispatch({ type: 'cities/loaded', payload: data });
    } catch (error) {
      dispatch({
        type: 'rejected',
        payload: 'There was an error when create city!',
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
        deleteAllCities,
        createSampleCities,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export { CitiesContext, CitiesProvider };
