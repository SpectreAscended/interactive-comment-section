import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../UI/Button';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import './authForm.scss';

const LoginForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [emailInputValue, setEmailInputValue] = useState('');
  const [passwordInputValue, setPasswordInputValue] = useState('');
  const navigate = useNavigate();

  const emailInputHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setEmailInputValue(e.currentTarget.value);
  };

  const passwordInputHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setPasswordInputValue(e.currentTarget.value);
  };

  const loginHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      emailInputValue.trim().length === 0 ||
      passwordInputValue.trim().length === 0
    ) {
      setError('Fields cannot be blank.');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        emailInputValue,
        passwordInputValue
      );
      const user = userCredential.user;

      navigate('/');
    } catch (err) {
      if (err instanceof Error) {
        const errorWithCode = err as { code?: string };
        if (errorWithCode.code === 'auth/wrong-password') {
          setError('Incorrect Password.');
        } else if (errorWithCode.code === 'auth/user-not-found') {
          setError(
            'No account with that email exists.  Please create an account.'
          );
        } else if (errorWithCode.code === 'auth/too-many-requests') {
          setError(
            'Too many failed requests.  Please try again in a few minutes.'
          );
        } else {
          setError('Unknown error. Please try again.');
        }
      }
    }
  };

  return (
    <section>
      <form className="auth-form" onSubmit={loginHandler}>
        <h1 className="auth-form__heading">Log in</h1>
        {error && <p className="auth-form__error-message">{error}</p>}
        <label htmlFor="email" className="auth-form__label">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="auth-form__input"
          autoComplete="email"
          value={emailInputValue}
          onChange={emailInputHandler}
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
          value={passwordInputValue}
          onChange={passwordInputHandler}
        />
        <div className="auth-form__actions">
          <p>
            Need an account?{' '}
            <Link to="/signup" className="auth-form__link">
              Sign up!
            </Link>{' '}
            <Link
              to="/reset"
              className="auth-form__link auth-form__link--forgot-password"
            >
              Forgot pasword?
            </Link>
          </p>

          <Button type="submit">Log in</Button>
        </div>
      </form>
    </section>
  );
};

export default LoginForm;
