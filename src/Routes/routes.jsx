import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { appRoutes } from './appRoutes';

import SpinnerFullPage from '../components/SpinnerFullPage';

const App = lazy(() => import('../App'));
const Homepage = lazy(() => import('../pages/Homepage'));
const Product = lazy(() => import('../pages/Product'));
const Pricing = lazy(() => import('../pages/Pricing'));
const Login = lazy(() => import('../pages/Login'));
const PageNotFound = lazy(() => import('../pages/PageNotFound'));

const routes = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<SpinnerFullPage />}>
        <App />
      </Suspense>
    ),
    errorElement: <PageNotFound />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: 'product',
        element: <Product />,
      },
      {
        path: 'pricing',
        element: <Pricing />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      appRoutes,
    ],
  },
]);

export { routes };
