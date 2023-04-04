import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../UI/Button';
import { signInWithEmailAndPassword } from 'firebase/auth';
import useValidation, {
  emailValidation,
  inputErrorClassesHandler,
} from '../../hooks/useValidation';
import { auth } from '../../firebase';
import './authForm.scss';

const LoginForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  // const [emailInputValue, setEmailInputValue] = useState('');
  const [passwordInputValue, setPasswordInputValue] = useState('');
  const navigate = useNavigate();

  // const emailInputHandler = (e: React.FormEvent<HTMLInputElement>) => {
  //   setEmailInputValue(e.currentTarget.value);
  // };

  const {
    inputValue: emailInputValue,
    inputValueHandler: emailInputHandler,
    inputBlurHandler: emailBlurHandler,
    hasError: emailHasError,
    isValid: emailIsValid,
  } = useValidation(emailValidation);

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

  const emailClasses = inputErrorClassesHandler(
    'auth-form__input',
    emailHasError
  );
  console.log(emailClasses);

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
