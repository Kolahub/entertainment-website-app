// import React from 'react';
import AuthForm from './AuthForm';
import useAuthForm from '../Hooks/useAuthForm';

const SignUpForm = () => {
  const { error, handleSubmit, passwordVisibility, togglePasswordVisibility } = useAuthForm(true);
  return (
    <AuthForm
      title="Sign Up"
      error={error}
      handleSubmit={handleSubmit}
      passwordVisibility={passwordVisibility}
      togglePasswordVisibility={togglePasswordVisibility}
      isSignUp={true}
    />
  );
};

export default SignUpForm;
