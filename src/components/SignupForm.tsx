import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './UI/Button';
import './authForm.scss';

const SignupForm: React.FC = () => {
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
          className="auth-form__input"
        />
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
        <label htmlFor="password-confirm" className="auth-form__label">
          Confirm Password
        </label>
        <input
          type="password"
          autoComplete="current-password"
          name="password-confirm"
          id="password-confirm"
          className="auth-form__input"
        />

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
