// import React from 'react';
import AuthForm from './AuthForm';
import useAuthForm from '../Hooks/useAuthForm';

const SignInForm = () => {
  const { error, handleSubmit, passwordVisibility, togglePasswordVisibility } = useAuthForm(false);
  return (
    <AuthForm
      title="Log In"
      error={error}
      handleSubmit={handleSubmit}
      passwordVisibility={passwordVisibility}
      togglePasswordVisibility={togglePasswordVisibility}
      isSignUp={false}
    />
  );
};

export default SignInForm;
