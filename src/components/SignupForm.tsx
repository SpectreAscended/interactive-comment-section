import { Link } from 'react-router-dom';
import Button from './UI/Button';
import useValidation, {
  nameValidation,
  emailValidation,
  passwordValidation,
} from '../hooks/useValidation';
import './authForm.scss';

const SignupForm: React.FC = () => {
  const {
    inputValue: nameInputValue,
    inputValueHandler: nameValueHandler,
    inputBlurHandler: nameBlurHandler,
    hasError: nameHasError,
  } = useValidation(nameValidation);

  const {
    inputValue: emailInputValue,
    inputValueHandler: emailValueHandler,
    inputBlurHandler: emailBlurHandler,
    hasError: emailHasError,
  } = useValidation(emailValidation);

  const {
    inputValue: passwordValue,
    inputValueHandler: passwordValueHandler,
    inputBlurHandler: passwordBlurHandler,
    hasError: passwordHasError,
  } = useValidation(passwordValidation);

  const {
    inputValue: confirmPasswordValue,
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

  return (
    <section>
      <form className="auth-form">
        <h1 className="auth-form__heading">Sign up</h1>
        <label htmlFor="username" className="auth-form__label">
          Create Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
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
          value={passwordValue}
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
          value={confirmPasswordValue}
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

          <Button type="submit" onClick={() => {}}>
            Log in
          </Button>
        </div>
      </form>
    </section>
  );
};

export default SignupForm;
