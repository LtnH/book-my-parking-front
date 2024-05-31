import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import Login from '../Components/Form/login'
import Signup from "../Components/Form/signup";
import '../CSS/nav.css'
import NavBar from '../Components/NavBar/NavBar'
import { SetStateAction } from "react";


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
    <div>
      {signIn ? (<Signup/>) : (<Login redirectToHome={redirectToHome}/>)}
    </div>

  )
}
