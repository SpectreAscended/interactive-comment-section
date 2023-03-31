import './footer.scss';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <span>Created by</span>
      <a
        href="https://spectreascended.github.io/personalhomepage/"
        target="_blank"
        rel="norefferrer noopenner"
      >
        Cory Pollard
      </a>
      <span>&copy; 2023</span>
    </footer>
  );
};

export default Footer;
