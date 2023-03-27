import Button from './UI/Button';
import './header.scss';

const Header: React.FC = () => {
  return (
    <header className="header">
      <nav className="header__nav">
        <ul>
          <li className="header__list--item">
            <Button onClick={() => {}}>Log in</Button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
