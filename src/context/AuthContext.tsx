import { createContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
interface AuthContextProviderProps {
  children: React.ReactNode;
}

interface UserData {
  userName: string;
  userImage?: string;
  email: string;
}

interface AuthContext {
  userData: {
    userName?: string;
    userImage?: string;
    email?: string;
  };
  isAuthenticated: boolean;
  authHandler: (a: boolean) => void;
}

export const authContext = createContext<AuthContext>({
  isAuthenticated: false,
  authHandler: () => {},
  userData: {},
});

export const AuthProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData | {}>({});

  useEffect(() => {
    const listener = onAuthStateChanged(auth, user => {
      if (user) {
        setIsAuthenticated(true);
        setUserData({
          userName: user.displayName,
          userImage: user.photoURL,
          email: user.email,
        });
      } else {
        setIsAuthenticated(false);
        setUserData({});
      }
    });

    return () => {
      listener();
    };
  }, []);

  const authHandler = (isAuth: boolean) => {
    if (isAuth != null) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  const value = {
    isAuthenticated,
    authHandler,
    userData,
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};
