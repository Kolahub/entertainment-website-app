// import React from 'react'
import logo from '/assets/logo.svg'
import SignInForm from '../components/SignInForm'


function SignIn() {
  return (
    <section className="bg-darkBlue  h-screen w-screen font-custom" id="SignIn">
      <div className="mx-auto max-w-8 pt-20 w-full">
        <img src={logo} alt="" />
      </div>
      <SignInForm />
    </section>
  )
}

export default SignIn