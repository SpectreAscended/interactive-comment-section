import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from './UI/Button';
import useValidation, {
  emptyFieldValidation,
  emailValidation,
  passwordValidation,
} from '../hooks/useValidation';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from '@firebase/auth';
import './authForm.scss';

const SignupForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const {
    inputValue: nameInputValue,
    inputValueHandler: nameValueHandler,
    inputBlurHandler: nameBlurHandler,
    hasError: nameHasError,
    isValid: nameIsValid,
  } = useValidation(emptyFieldValidation);

  const {
    inputValue: emailInputValue,
    inputValueHandler: emailValueHandler,
    inputBlurHandler: emailBlurHandler,
    hasError: emailHasError,
    isValid: emailIsValid,
  } = useValidation(emailValidation);

  const {
    inputValue: passwordInputValue,
    inputValueHandler: passwordValueHandler,
    inputBlurHandler: passwordBlurHandler,
    hasError: passwordHasError,
    isValid: passwordIsValid,
  } = useValidation(passwordValidation);

  const {
    inputValue: confirmPasswordInputValue,
    inputValueHandler: confirmPasswordValueHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    hasError: confirmPasswordHasError,
  } = useValidation(passwordValidation);

  const inputClassesHandler = (inputHasError: boolean) => {
    return `auth-form__input ${inputHasError ? 'auth-form__input--error' : ''}`;
  };
  const nameClasses = inputClassesHandler(nameHasError);
  const emailClasses = inputClassesHandler(emailHasError);
  const passwordClasses = inputClassesHandler(passwordHasError);
  const confirmPasswordClasses = inputClassesHandler(confirmPasswordHasError);

  const formSubmissionHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const formIsValid = nameIsValid && emailIsValid && passwordIsValid;

    if (!formIsValid) return;
    if (passwordInputValue !== confirmPasswordInputValue) {
      setError('Passwords do not match');
      return;
    }
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        emailInputValue,
        passwordInputValue
      );
      const user = userCredential.user;
      await updateProfile(user, { displayName: nameInputValue });

      navigate('/');
    } catch (err) {
      if (err instanceof Error) {
        const errorWithCode = err as { code?: string };
        if (errorWithCode.code === 'auth/email-already-in-use') {
          setError('An account with that email already exists.');
        } else if (errorWithCode.code === 'auth/weak-password') {
          setError(
            'Weak password.  Please enter a password with more than 6 characters.'
          );
        } else {
          setError('An error occured. Please try again.');
        }
      }
    }
  };

  return (
    <section>
      <form className="auth-form" onSubmit={formSubmissionHandler}>
        <h1 className="auth-form__heading">Sign up</h1>
        {error && <p className="auth-form__error-message">{error}</p>}
        <label htmlFor="username" className="auth-form__label">
          Create Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          autoComplete="username"
          className={nameClasses}
          value={nameInputValue}
          onChange={nameValueHandler}
          onBlur={nameBlurHandler}
        />
        {nameHasError && (
          <p className="auth-form__error-message">Username cannot be blank.</p>
        )}
        <label htmlFor="email" className="auth-form__label">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          autoComplete="email"
          className={emailClasses}
          value={emailInputValue}
          onChange={emailValueHandler}
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
          onChange={passwordValueHandler}
          onBlur={passwordBlurHandler}
        />
        {passwordHasError && (
          <p className="auth-form__error-message">
            Password must be atleast 6 characters long.
          </p>
        )}

        <label htmlFor="password-confirm" className="auth-form__label">
          Confirm Password
        </label>
        <input
          type="password"
          autoComplete="current-password"
          name="password-confirm"
          id="password-confirm"
          className={confirmPasswordClasses}
          value={confirmPasswordInputValue}
          onChange={confirmPasswordValueHandler}
          onBlur={confirmPasswordBlurHandler}
        />
        {confirmPasswordHasError && (
          <p className="auth-form__error-message">
            Password must be atleast 6 characters long.
          </p>
        )}

        <div className="auth-form__actions">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="auth-form__link">
              Log in!
            </Link>
          </p>

          <Button type="submit">Sign up</Button>
        </div>
      </form>
    </section>
  );
};

export default SignupForm;
