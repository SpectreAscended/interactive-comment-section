import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './pages/Layout';
import ErrorBoundary from './pages/Error';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import ResetPasswordPage from './pages/ResetPassword';
import ChangePasswordPage from './pages/ChangePassword';
import CommentSectionPage, {
  action as postCommentAction,
  loader as commentLoader,
} from './pages/CommentSection';
import AccountPage from './pages/Account';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <CommentSectionPage />,
        action: postCommentAction,
        loader: commentLoader,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/signup',
        element: <SignupPage />,
      },
      {
        path: '/reset',
        element: <ResetPasswordPage />,
      },

      {
        path: '/account',
        children: [
          {
            index: true,
            element: <AccountPage />,
          },
          {
            path: 'changepassword',
            element: <ChangePasswordPage />,
          },
        ],
      },
    ],
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
