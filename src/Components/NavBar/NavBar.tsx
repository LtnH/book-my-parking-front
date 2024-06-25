import * as React from "react";
import { AppBar, Button, IconButton, Toolbar, Typography, Box, Menu, MenuItem } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { AccountCircle } from "@mui/icons-material";
import { SetStateAction, useEffect } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";

export default function NavBar({ isLogin, signIn, setSignIn, setAuth, user }: Readonly<{
  isLogin: boolean,
  signIn: boolean,
  setSignIn: SetStateAction<any>
  setAuth: SetStateAction<any>
  user: { userId: number; isAdmin: boolean } | null
}>) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  console.log(user?.isAdmin)
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleHome = () => {
    navigate("/home")
  }

  const handleReservation = () => {
    navigate("/reservation")
  }
  const handleDeconnection = () => {
    setAuth(false)
    navigate("/")
  }


  const handleAdmin = (event: any) => {
    navigate("/admin")
  };
  const handleClose = (event: any) => {
    console.log(event)
    setAnchorEl(null);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h2" component="div" sx={{ flexGrow: 1 }} onClick={handleHome}>
            Book My Parking
          </Typography>
          {isLogin ?
            (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle/>
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  {user?.isAdmin === true && (<MenuItem onClick={handleAdmin}>Administration</MenuItem>)}
                  <MenuItem onClick={handleReservation}>Mes Réservations</MenuItem>
                  <MenuItem onClick={handleDeconnection}>Déconnection</MenuItem>
                </Menu>
              </div>

            ) : (signIn ? (
                <Button color="inherit" onClick={() => setSignIn(false)}>Connexion</Button>
              ) : (
                <Button color="inherit" onClick={() => setSignIn(true)}>Inscription</Button>
              )
            )
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}