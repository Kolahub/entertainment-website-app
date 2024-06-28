// import React from 'react'
import { redirect, useNavigate } from "react-router-dom";
import { app } from "../firebase/firebase";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth(app)

function Home() {
  const navigate = useNavigate()
  async function logout () {
    try {
      await signOut(auth)
      navigate('/signup')
    } catch(err) {
      console.log(err.message);
    }
  }

  return (
    <div>
      <button onClick={logout}>logout</button>
    </div>
  )
}

export default Home

export async function Loader () {
  const user = auth.currentUser
  return !user ? redirect('/signup') : null
}