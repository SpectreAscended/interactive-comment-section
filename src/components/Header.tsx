import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Button from './UI/Button';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { authContext } from '../context/AuthContext';
import './header.scss';

const Header: React.FC = () => {
  const { isAuthenticated, authHandler } = useContext(authContext);

  return (
    <header className="header">
      <nav className="header__nav">
        <ul>
          <li>
            <NavLink to="/">
              <Button variant="secondary">Home</Button>
            </NavLink>
          </li>
          {isAuthenticated && (
            <li>
              <NavLink to="account">
                <Button variant="secondary">Account</Button>
              </NavLink>
            </li>
          )}
          <li>
            {isAuthenticated ? (
              <Button
                onClick={() => {
                  signOut(auth);
                  authHandler(false);
                }}
              >
                Log out
              </Button>
            ) : (
              <NavLink to="login" className="header__list--item">
                <Button>Log in</Button>
              </NavLink>
            )}
          </li>
          <li></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
