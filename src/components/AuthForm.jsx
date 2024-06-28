// import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { NavLink } from 'react-router-dom';
import hide from '../assets/eye-slash-fill.svg';
import show from '../assets/eye-fill.svg';

const AuthForm = ({ title, error, handleSubmit, passwordVisibility, togglePasswordVisibility, isSignUp }) => {
  return (
    <div className="font-light max-w-full w-calc-custom sm:max-w-[500px] w-full mt-8 bg-semiDarkBlue rounded-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="p-8 w-full">
        <h1 className="text-4xl text-white ">{title}</h1>
        {error.errMsg && <p className="text-customRed pt-3">{error.errMsg}</p>}
        <form className="pt-8 flex flex-col w-full" onSubmit={handleSubmit}>
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              className="bg-transparent w-full text-xl text-white mb-6 border-b-2 border-b-greyishBlue p-3 focus:outline-none focus:border-b-white caret-customRed"
            />
            {error.email && (
              <p className="absolute top-[25%] text-customRed right-0 text-sm">Can&apos;t be empty</p>
            )}
          </div>
          <div className="relative">
            <input
              type={passwordVisibility.password ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              className="bg-transparent w-full text-xl text-white mb-6 border-b-2 border-b-greyishBlue p-3 focus:outline-none focus:border-b-white caret-customRed"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('password')}
              className="absolute top-[25%] right-0 transform -translate-y-1/2 text-white"
            >
              {passwordVisibility.password ? <img src={hide} alt="" className="w-5" /> : <img src={show} alt="" className="w-5" />}
            </button>
            {error.password && (
              <p className="absolute top-[25%] text-customRed right-0 text-sm">Can&apos;t be empty</p>
            )}
          </div>
          {isSignUp && (
            <div className="relative">
              <input
                type={passwordVisibility.repeatPassword ? 'text' : 'password'}
                name="repeatPassword"
                placeholder="Repeat password"
                className="bg-transparent w-full text-xl text-white mb-6 border-b-2 border-b-greyishBlue p-3 focus:outline-none focus:border-b-white caret-customRed"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('repeatPassword')}
                className="absolute top-[25%] -translate-y-1/2 right-0 transform text-white"
              >
                {passwordVisibility.repeatPassword ? <img src={hide} alt="" className="w-5" /> : <img src={show} alt="" className="w-5" />}
              </button>
              {error.repeatPassword && (
                <p className="absolute top-[25%] text-customRed right-0 text-sm">Can&apos;t be empty</p>
              )}
            </div>
          )}
          <button className={`w-full bg-customRed py-3 text-white text-center rounded-xl text-lg mb-7 hover:bg-white hover:text-darkBlue ${error.loading ? 'cursor-not-allowed' : 'cursor-default'}`} disabled={error.loading}>
            {error.loading ? (isSignUp ? 'Creating account...' : 'Logging In...') : (isSignUp ? 'Create an account' : 'Login to your account')}
          </button>
          <p className="text-white text-lg text-center">
            {isSignUp ? 'Already have an account?' : 'Don\'t have an account?'}
            {' '}
            <NavLink to={isSignUp ? '/signin' : '/signup'} className="text-customRed ml-2">
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

// Prop Types validation
AuthForm.propTypes = {
  title: PropTypes.string.isRequired,
  error: PropTypes.shape({
    email: PropTypes.bool,
    password: PropTypes.bool,
    repeatPassword: PropTypes.bool,
    errMsg: PropTypes.string,
    loading: PropTypes.bool,
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  passwordVisibility: PropTypes.shape({
    password: PropTypes.bool,
    repeatPassword: PropTypes.bool,
  }).isRequired,
  togglePasswordVisibility: PropTypes.func.isRequired, // Ensure togglePasswordVisibility is provided and is a function
  isSignUp: PropTypes.bool.isRequired,
};

export default AuthForm;
