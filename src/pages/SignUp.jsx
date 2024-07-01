// import React from 'react'
import logo from '/assets/logo.svg'
import SignUpForm from '../components/SignUpForm'

function SignUp() {
  return (
    <section className="bg-darkBlue  h-screen w-screen font-custom" id="SignUp">
      <div className="mx-auto max-w-8 pt-20 w-full">
        <img src={logo} alt="" />
      </div>
      <SignUpForm />
    </section>
  )
}

export default SignUp