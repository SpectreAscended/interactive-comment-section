import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Button from './UI/Button';
import { auth } from '../firebase';
import { authContext } from '../context/AuthContext';
import { useDispatch } from 'react-redux';
import { uiActions } from '../store/uiSlice';
import { useAppSelector } from '../hooks/stateHooks';
import './header.scss';

const Header: React.FC = () => {
  const { isAuthenticated } = useContext(authContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const replyInput = useAppSelector(state => state.ui.replyInput);
  const editInput = useAppSelector(state => state.ui.editInput);

  const handleSignout = async () => {
    await auth.signOut();
    navigate('/');

    if (replyInput.menuOpen) {
      dispatch(uiActions.closeReply());
    }

    if (editInput.menuOpen) {
      dispatch(uiActions.closeEdit());
    }
  };

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
              <Button onClick={handleSignout}>Log out</Button>
            ) : (
              <NavLink to="login" className="">
                <Button>Log in</Button>
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
