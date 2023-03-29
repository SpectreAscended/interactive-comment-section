import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './UI/Button';
import useValidation, {
  emailValidation,
  passwordValidation,
} from '../hooks/useValidation';
import './authForm.scss';

const LoginForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const {
    inputValue: emailInputValue,
    inputValueHandler: emailInputHandler,
    inputBlurHandler: emailBlurHandler,
    hasError: emailHasError,
    isValid: emailIsValid,
  } = useValidation(emailValidation);

  const {
    inputValue: passwordInputValue,
    inputValueHandler: passwordInputHandler,
    inputBlurHandler: passwordBlurHandler,
    hasError: passwordHasError,
    isValid: passwordIsValid,
  } = useValidation(passwordValidation);
  // BUG Do you really need validation for the login form? Probably not.
  const loginHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const formIsValid = emailIsValid && passwordIsValid;
    if (!formIsValid) return;

    try {
    } catch (err) {}
  };

  const inputClassesHandler = (inputHasError: boolean) => {
    return `auth-form__input ${inputHasError ? 'auth-form__input--error' : ''}`;
  };
  const emailClasses = inputClassesHandler(emailHasError);
  const passwordClasses = inputClassesHandler(passwordHasError);

  return (
    <section>
      <form className="auth-form" onSubmit={loginHandler}>
        <h1 className="auth-form__heading">Log in</h1>
        <label htmlFor="email" className="auth-form__label">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className={emailClasses}
          autoComplete="email"
          value={emailInputValue}
          onChange={emailInputHandler}
          onBlur={emailBlurHandler}
        />
        {emailHasError && (
          <p className="auth-form__error-message">
            Please enter a valid email.
          </p>
        )}

        <label htmlFor="password" className="auth-form__label">
          Password
        </label>
        <input
          type="password"
          autoComplete="current-password"
          name="password"
          id="password"
          className={passwordClasses}
          value={passwordInputValue}
          onChange={passwordInputHandler}
          onBlur={passwordBlurHandler}
        />
        {passwordHasError && (
          <p className="auth-form__error-message">
            Password must be atleast 6 characters long.
          </p>
        )}

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
