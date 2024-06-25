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
  const [user, setUser] = React.useState<{userId: number, isAdmin: boolean} | null>(null)
  const [signIn, setSignIn] = React.useState(false);
  // @ts-ignore
  const [reservation, setReservation] = React.useState([
    {
      id: 1,
      start: '2024-06-25 09:30:00',
      end: '2024-06-25 12:30:00',
      resourceId: 'place1',
      title: 'Réservé 9H30-12h30',
      bgColor: '#D9D9D9',
    },
    {
      id: 2,
      start: '2024-06-26 12:30:00',
      end: '2024-06-26 23:30:00',
      resourceId: 'place1',
      title: 'Réservé 12H30-23h30',
      resizable: false,
    },
    {
      id: 3,
      start: '2024-06-25 12:30:00',
      end: '2024-06-25 23:30:00',
      resourceId: 'place2',
      title: 'Réservé 12H30-23h30',
      movable: false,
    },
    {
      id: 4,
      start: '2024-06-25 14:30:00',
      end: '2024-06-25 23:30:00',
      resourceId: 'place1',
      title: 'Réservé 14H30-23h30',
      startResizable: false,
    },
    {
      id: 6,
      start: '2024-06-25 14:30:00',
      end: '2024-06-25 16:30:00',
      resourceId: 'place1',
      title: 'Réservé 14H30-16h30',
      userId: 1,
    },
  ])
  const [resources, setResources] = React.useState([
    {id: 'site1', name: 'ESGI Lyon', groupOnly: true},
    {id: 'place1', name: 'Place 1', parentId: 'site1'},
    {id: 'place2', name: 'Place 2', parentId: 'site1'},
    {id: 'place3', name: 'Place 3', parentId: 'site1'},
    {id: 'place4', name: 'Place 4', parentId: 'site1'},
    {id: 'place5', name: 'Place 5', parentId: 'site1'},
    {id: 'place6', name: 'Place 6', parentId: 'site1'},
    {id: 'place7', name: 'Place 7', parentId: 'site1'},
    {id: 'place8', name: 'Place 8', parentId: 'site1'},
  ]);
  const [site, setSite] = React.useState([
    {id: 'site1', name: 'ESGI Lyon', address: '40 rue du bouldodrome', city: 'Lyon', companyId: 'ESGI'}
  ])

  const isAuth = (user: any) => {
    if (user.email == "admin@esgi.fr") {
      setUser({
        userId: 2,
        isAdmin: true,
      })
    } else {
      setUser({
        userId: 1,
        isAdmin: true
      })
    }
  }
  const [compagnies, setCompagnies] = React.useState([
    {compagnyId: 1, compagnyName: 'ESGI'},
    {compagnyId: 2, compagnyName: 'Vinci'}
  ])

  const [place, setPlace] = React.useState([
    {id: 'place1', name: 'Place 1', buildingId: 'site1'},
    {id: 'place2', name: 'Place 2', buildingId: 'site1'},
    {id: 'place3', name: 'Place 3', buildingId: 'site1'},
    {id: 'place4', name: 'Place 4', buildingId: 'site1'},
    {id: 'place5', name: 'Place 5', buildingId: 'site1'},
    {id: 'place6', name: 'Place 6', buildingId: 'site1'},
    {id: 'place7', name: 'Place 7', buildingId: 'site1'},
    {id: 'place8', name: 'Place 8', buildingId: 'site1'},
  ])

  return (
    <div>
      <NavBar isLogin={auth} signIn={signIn} setSignIn={setSignIn}/>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage auth={auth} setAuth={setAuth} signIn={signIn} setSignIn={setSignIn}/>}/>
            <Route path="/home" element={<HomePage reservation={reservation} setReservation={setReservation} resources={resources} place={place} site={site} compagnies={compagnies} />}/>
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
