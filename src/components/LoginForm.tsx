import { Link } from 'react-router-dom';
import Button from './UI/Button';
import './authForm.scss';

const LoginForm: React.FC = () => {
  return (
    <section>
      <form className="auth-form">
        <h1 className="auth-form__heading">Log in</h1>
        <label htmlFor="email" className="auth-form__label">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="auth-form__input"
        />
        <label htmlFor="password" className="auth-form__label">
          Password
        </label>
        <input
          type="password"
          autoComplete="current-password"
          name="password"
          id="password"
          className="auth-form__input"
        />
        <div className="auth-form__actions">
          <p>
            Need an account?{' '}
            <Link to="/signup" className="auth-form__link">
              Sign up!
            </Link>
          </p>

          <Button type="submit" onClick={() => {}}>
            Log in
          </Button>
        </div>
      </form>
    </section>
  );
};

export default LoginForm;
