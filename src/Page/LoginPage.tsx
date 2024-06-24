import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../Components/Form/Login';
import Signup from '../Components/Form/Signup';
import '../CSS/nav.css';
import '../App.css';

interface LoginPageProps {
  auth: boolean;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
  signIn: boolean;
  setSignIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LoginPage({ auth, setAuth, signIn, setSignIn }: LoginPageProps) {
  const navigate = useNavigate();

  const redirectToHome = () => {
    setAuth(true);
    navigate('/home');
  };

  return (
    <div className="App">
      {signIn ? <Signup /> : <Login redirectToHome={redirectToHome} />}
    </div>
  );
}
