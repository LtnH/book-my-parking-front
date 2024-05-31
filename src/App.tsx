import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom';
import LoginPage from "./Page/LoginPage";
import Signup from "./Components/Form/signup";
import HomePage from "./Page/HomePage";
import NavBar from "./Components/NavBar/NavBar";

function App() {
    const [auth, setAuth] = React.useState(false);
    const [signIn, setSignIn] = React.useState(false);

  return (
        <div className="App">
            <NavBar isLogin={auth} signIn={signIn} setSignIn={setSignIn}/>

            <BrowserRouter>
              <Routes>
                  <Route path="/"  element={<LoginPage auth={auth} setAuth={setAuth} signIn={signIn} setSignIn={setSignIn}/>}/>
                  <Route path="/Signup" Component={Signup}/>
                  <Route path="/home" element={<HomePage />} />
              </Routes>
          </BrowserRouter>
        </div>
    );
}

export default App;
