import { useState } from 'react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword, updatePassword } from 'firebase/auth';
import Button from '../UI/Button';
import useSimpleInput from '../../hooks/useSimpleInput';
import useValidation, { passwordValidation } from '../../hooks/useValidation';
import { Link, useNavigate } from 'react-router-dom';
import { REDIRECT_TIMER } from '../../appConfig';
import './authForm.scss';

const ChangePasswordForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    inputValue: currentPasswordValue,
    setInput: setCurrentPassword,
    resetInput: resetPassword,
  } = useSimpleInput();

  const {
    inputValue: newPasswordValue,
    inputValueHandler: setNewPassword,
    inputBlurHandler: newPasswordBlurHandler,
    resetInput: resetNewPassword,
    hasError: newPasswordHasError,
  } = useValidation(passwordValidation);

  const {
    inputValue: confirmPasswordValue,
    inputValueHandler: setConfirmPassword,
    inputBlurHandler: confirmPasswordBlurHandler,
    resetInput: resetConfirmPassword,
    hasError: confirmPasswordHasError,
  } = useValidation(passwordValidation);

  const resetInputs = () => {
    resetPassword();
    resetNewPassword();
    resetConfirmPassword();
  };

  const user = auth.currentUser;

  const changePasswordHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    setError(null);

    const email = user?.email;
    if (!email) {
      return;
    }

    if (newPasswordValue !== confirmPasswordValue) {
      setError('New passwords do not match.');
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        currentPasswordValue
      );
      if (!userCredential) return;

      await updatePassword(userCredential.user, newPasswordValue);

      setSuccessMessage('Password changed!');
      resetInputs();

      setTimeout(() => {
        navigate('/');
      }, REDIRECT_TIMER);
    } catch (err) {
      if (err instanceof Error) {
        const errorWithCode = err as { code?: string };
        console.error(errorWithCode.code);
        if (errorWithCode.code === 'auth/wrong-password') {
          setError('Incorrect Password.');
        } else if (errorWithCode.code === 'auth/weak-password') {
          setError(
            'Weak password.  Please enter a password with more than 6 characters.'
          );
        } else {
          setError('An error occured.');
        }
      }
    }
  };

  const inputClassesHandler = (inputHasError: boolean) => {
    return `auth-form__input ${inputHasError ? 'auth-form__input--error' : ''}`;
  };

  const newPasswordClasses = inputClassesHandler(newPasswordHasError);
  const confirmPasswordClasses = inputClassesHandler(confirmPasswordHasError);

  return (
    <section>
      <form className="auth-form" onSubmit={changePasswordHandler}>
        <h1 className="auth-form__heading">Change password</h1>
        {error && <p className="auth-form__error-message">{error}</p>}
        {successMessage && (
          <p className="auth-form__success-message">{successMessage}</p>
        )}
        <input hidden type="email" autoComplete="username" />
        <label htmlFor="password" className="auth-form__label">
          Current password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          autoComplete="current-password"
          className="auth-form__input"
          onChange={setCurrentPassword}
          value={currentPasswordValue}
        />

        <label htmlFor="new-password" className="auth-form__label">
          New password
        </label>
        <input
          type="password"
          id="new-password"
          name="new-password"
          autoComplete="off"
          className={newPasswordClasses}
          onChange={setNewPassword}
          onBlur={newPasswordBlurHandler}
          value={newPasswordValue}
        />
        {newPasswordHasError && (
          <p className="auth-form__error-message">
            Password must be atleast 6 characters.
          </p>
        )}

        <label htmlFor="password-confirm" className="auth-form__label">
          Confirm new password
        </label>
        <input
          type="password"
          id="new-password-confirm"
          name="new-password-confirm"
          autoComplete="off"
          className={confirmPasswordClasses}
          onChange={setConfirmPassword}
          onBlur={confirmPasswordBlurHandler}
          value={confirmPasswordValue}
        />
        {confirmPasswordHasError && (
          <p className="auth-form__error-message">
            Password must be atleast 6 characters.
          </p>
        )}
        <Link
          to="/reset"
          className="auth-form__link auth-form__link--forgot-password"
          style={{ marginTop: '1rem' }}
        >
          Forgot password?
        </Link>
        <div className="auth-form__actions">
          <Link to=".." className="auth-form__btn">
            Cancel
          </Link>
          <Button type="submit">Change password</Button>
        </div>
      </form>
    </section>
  );
};

export default ChangePasswordForm;
