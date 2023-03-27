import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './pages/Layout';
import ErrorBoundary from './pages/Error';

export const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <RootLayout />,
      },
    ],
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
