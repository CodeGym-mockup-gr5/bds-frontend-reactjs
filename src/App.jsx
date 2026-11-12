import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './features/shared/layout/Layout';
import HomePage from './features/shared/pages/HomePage';
import NotFoundPage from './features/shared/pages/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
