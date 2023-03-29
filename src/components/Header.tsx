import { NavLink } from 'react-router-dom';
import Button from './UI/Button';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import './header.scss';

const Header: React.FC = () => {
  return (
    <header className="header">
      <nav className="header__nav">
        <ul>
          <li>
            <NavLink to="/">
              <Button variant="secondary">Home</Button>
            </NavLink>
          </li>
          <li>
            <NavLink to="login" className="header__list--item">
              <Button>Log in</Button>
            </NavLink>
          </li>
          <li>
            <Button
              onClick={() => {
                signOut(auth);
              }}
            >
              Log out
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
