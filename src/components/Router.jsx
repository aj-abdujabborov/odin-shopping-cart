import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import ShopPage from '../ShopPage';
import HomePage from '../HomePage';
import ErrorPage from '../ErrorPage';

function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '',
          element: <HomePage />,
        },
        {
          path: '/Shop/:category',
          element: <ShopPage />,
        },
        {
          path: '/Shop',
          element: <ShopPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
