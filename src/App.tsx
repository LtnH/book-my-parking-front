import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import LoginPage from "./Page/LoginPage";
import Signup from "./Components/Form/Signup";
import HomePage from "./Page/HomePage";
import NavBar from "./Components/NavBar/NavBar";
import Reservations from "./Page/ReservationPage";
import AdminPage from "./Page/AdminPage";
import { Box } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

function App() {
  const [auth, setAuth] = React.useState(false);
  const [signIn, setSignIn] = React.useState(false);

  return (
    <div>
      <NavBar isLogin={auth} signIn={signIn} setSignIn={setSignIn}/>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage auth={auth} setAuth={setAuth} signIn={signIn} setSignIn={setSignIn}/>}/>
            <Route path="/Signup" Component={Signup}/>
            <Route path="/home" element={<HomePage/>}/>
            <Route path="/reservation" element={<Reservations/>}/>
            <Route path="/Admin" element={<AdminPage/>}/>
          </Routes>
        </BrowserRouter>
        {/*<Box className="background-shape left"/>*/}
        {/*<Box className="background-shape right"/>*/}
      </LocalizationProvider>

    </div>
  );
}

export default App;
