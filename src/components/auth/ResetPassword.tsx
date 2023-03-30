import { useState } from 'react';
import { useNavigate, useNavigation } from 'react-router-dom';
import useValidation, { emailValidation } from '../../hooks/useValidation';
import Button from '../UI/Button';
import { auth } from '../../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { REDIRECT_TIMER } from '../../appConfig';
import './authForm.scss';

const ResetPasswordForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const navigation = useNavigation();

  const submitting = navigation.state === 'submitting';

  const {
    inputValue: emailInputValue,
    inputValueHandler: emailInputValueHandler,
    inputBlurHandler: emailBlurHandler,
    hasError: emailHasError,
    isValid: emailIsValid,
    resetInput: resetEmailInput,
  } = useValidation(emailValidation);

  const inputClasses = `auth-form__input ${
    emailHasError ? 'auth-form__input--error' : ''
  }`;

  const resetPasswordHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!emailIsValid) {
      setError('Please enter a valid email.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, emailInputValue);
      setSuccessMessage('Password reset email sent.  Please check your email.');
      resetEmailInput();
      setTimeout(() => {
        navigate('/login');
      }, REDIRECT_TIMER);
    } catch (err) {
      if (err instanceof Error) {
        const errorWithCode = err as { code?: string };
        console.error(errorWithCode.code);
        if (errorWithCode.code === 'auth/user-not-found') {
          setError('Email not found.  Please create an account.');
        }
        if (errorWithCode.code === 'auth/too-many-requests') {
          setError('Too many requests.  Please try again in a few minutes.');
        } else {
          setError('An error occured.');
        }
      }
    }
  };

  return (
    <section>
      <form className="auth-form" onSubmit={resetPasswordHandler}>
        <h1 className="auth-form__heading">Reset password</h1>
        {error && <p className="auth-form__error-message">{error}</p>}
        {successMessage && (
          <p className="auth-form__success-message">{successMessage}</p>
        )}
        <input hidden type="email" autoComplete="username" />
        <label htmlFor="email" className="auth-form__label">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          className={inputClasses}
          value={emailInputValue}
          onChange={emailInputValueHandler}
          onBlur={emailBlurHandler}
        />
        {emailHasError && (
          <p className="auth-form__error-message">
            Please enter a valid email address
          </p>
        )}
        <div className="auth-form__actions">
          <Button type="submit" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Reset Password'}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default ResetPasswordForm;
