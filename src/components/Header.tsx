import { NavLink } from 'react-router-dom';
import Button from './UI/Button';
import './header.scss';

const Header: React.FC = () => {
  return (
    <header className="header">
      <nav className="header__nav">
        <ul>
          <NavLink to="login" className="header__list--item">
            <Button onClick={() => {}}>Log in</Button>
          </NavLink>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
