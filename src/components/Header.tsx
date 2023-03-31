import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Button from './UI/Button';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { authContext } from '../context/AuthContext';
import './header.scss';

const Header: React.FC = () => {
  const { isAuthenticated, authHandler } = useContext(authContext);
  const navigate = useNavigate();

  return (
    <header className="header">
      <nav className="header__nav">
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'header__nav-link header__nav-link--active'
                  : 'header__nav-link'
              }
            >
              Home
            </NavLink>
          </li>
          {isAuthenticated && (
            <li>
              <NavLink
                to="account"
                className={({ isActive }) =>
                  isActive
                    ? 'header__nav-link header__nav-link--active'
                    : 'header__nav-link'
                }
              >
                Account
              </NavLink>
            </li>
          )}
          <li>
            {isAuthenticated ? (
              <Button
                onClick={() => {
                  signOut(auth);
                  navigate('/');
                }}
              >
                Log out
              </Button>
            ) : (
              <NavLink to="login" className="">
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
