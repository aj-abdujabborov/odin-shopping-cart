import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import ShopPage from '../ShopPage';
import HomePage from '../HomePage';
import ErrorPage from '../ErrorPage';
import CartPage from '../CartPage';

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
          path: '/shop/:category',
          element: <ShopPage />,
        },
        {
          path: '/shop',
          element: <ShopPage />,
        },
        {
          path: '/cart',
          element: <CartPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
