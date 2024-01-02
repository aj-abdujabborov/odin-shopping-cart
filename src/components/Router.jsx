import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../pages/App';
import ShopPage from '../pages/ShopPage';
import HomePage from '../pages/HomePage';
import ErrorPage from '../pages/ErrorPage';
import CartPage from '../pages/CartPage';

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
