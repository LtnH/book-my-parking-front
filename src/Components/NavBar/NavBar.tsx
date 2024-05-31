import * as React from "react";
import { AppBar, Button, IconButton, Toolbar, Typography, Box, Menu, MenuItem } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { AccountCircle } from "@mui/icons-material";
import { SetStateAction } from "react";

export default function NavBar({ isLogin, signIn, setSignIn }: Readonly<{
  isLogin: boolean,
  signIn: boolean,
  setSignIn: SetStateAction<any>
}>) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
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
                    vertical: 'top',
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
                  <MenuItem onClick={handleClose}>Mes Réservations</MenuItem>
                  <MenuItem onClick={handleClose}>Déconnection</MenuItem>
                </Menu>
              </div>

            ) : (signIn ? (
                <Button color="inherit" onClick={() => setSignIn(false)}>Login</Button>
              ) : (
                <Button color="inherit" onClick={() => setSignIn(true)}>Sign in</Button>
              )
            )
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}