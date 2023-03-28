import { NavLink } from 'react-router-dom';
import Button from './UI/Button';
import './header.scss';

const Header: React.FC = () => {
  return (
    <header className="header">
      <nav className="header__nav">
        <ul>
          <li>
            <NavLink to="/">
              <Button onClick={() => {}} variant="secondary">
                Home
              </Button>
            </NavLink>
          </li>
          <li>
            <NavLink to="login" className="header__list--item">
              <Button onClick={() => {}}>Log in</Button>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
