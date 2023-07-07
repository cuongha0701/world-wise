import { createContext, useCallback, useEffect, useReducer } from 'react';

const CitiesContext = createContext();

const BASE_URL = import.meta.env.VITE_API_URL;

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
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: 'cities/loaded', payload: data });
      } catch (error) {
        dispatch({
          type: 'rejected',
          payload: 'There was an error when loading cities!',
        });
      }
    })();
  }, []);

  const getCity = useCallback(async function getCity(id) {
    if (Number(id) === currentCity.id) return;
    try {
      dispatch({ type: 'loading' });
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: 'city/loaded', payload: data });
    } catch (error) {
      dispatch({
        type: 'rejected',
        payload: 'There was an error when loading city!',
      });
    }
  }, [currentCity.id]);

  async function createCity(newCity) {
    try {
      dispatch({ type: 'loading' });
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
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
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      });
      dispatch({ type: 'city/deleted', payload: id });
    } catch (error) {
      dispatch({
        type: 'rejected',
        payload: 'There was an error when deleting city!',
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
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export { CitiesContext, CitiesProvider };
