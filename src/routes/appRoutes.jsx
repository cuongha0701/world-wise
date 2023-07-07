import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const AppLayout = lazy(() => import('../pages/AppLayout'));

import CityList from '../components/CityList';
import City from '../components/City';
import CountryList from '../components/CountryList';
import Form from '../components/Form';
import ProtectedRoute from '../pages/ProtectedRoute';

export const appRoutes = {
  path: 'app',
  element: (
    <ProtectedRoute>
      <AppLayout />
    </ProtectedRoute>
  ),
  children: [
    {
      index: true,
      element: <Navigate to={'cities'} replace />,
    },
    {
      path: 'cities',
      element: <CityList />,
    },
    {
      path: 'cities/:id',
      element: <City />,
    },
    {
      path: 'countries',
      element: <CountryList />,
    },
    {
      path: 'form',
      element: <Form />,
    },
  ],
};
