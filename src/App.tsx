import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './pages/Layout';
import ErrorBoundary from './pages/Error';
import LoginPage from './pages/Login';
import CommentSectionPage from './pages/CommentSection';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <CommentSectionPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
