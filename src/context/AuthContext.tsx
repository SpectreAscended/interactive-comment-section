import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
interface AuthContextProviderProps {
  children: React.ReactNode;
}

interface AuthContext {
  isAuthenticated: boolean;
  authHandler: (a: boolean) => void;
}

export const authContext = createContext<AuthContext>({
  isAuthenticated: false,
  authHandler: () => {},
});

export const AuthProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const listener = onAuthStateChanged(auth, user => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
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
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};
