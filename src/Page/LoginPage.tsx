import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import Login from '../Components/Form/Login'
import Signup from "../Components/Form/Signup";
import '../CSS/nav.css'
import { SetStateAction } from "react";
import '../App.css';

export default function LoginPage({auth, setAuth, signIn, setSignIn}: Readonly<{
  auth: boolean,
  setAuth: SetStateAction<any>,
  signIn: boolean,
  setSignIn: SetStateAction<any>
}>) {

  const navigate = useNavigate();
  const redirectToHome = (): void => {
    setAuth(true)
    return navigate('/home')
  }

  return (
    <div className="App">
      {signIn ? (<Signup setSignIn={setSignIn}/>) : (<Login redirectToHome={redirectToHome} setSignIn={setSignIn}/>)}
    </div>

  )
}
