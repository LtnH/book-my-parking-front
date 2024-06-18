import * as React from 'react';
import { AppBar, Drawer, MenuItem, IconButton, Paper, TextField, Button, Box, Typography } from '@mui/material';
import { SetStateAction, useState } from "react";
import firebase from "firebase/compat";

type redirectToHome = () => void
export default function Login({ redirectToHome }: Readonly<{ redirectToHome: redirectToHome }>) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  const handleSubmit = (event: { preventDefault: () => void; }) => {

    event.preventDefault()

    setEmailError(false)
    setPasswordError(false)

    if (email == '') {
      setEmailError(true)
    }
    if (password == '') {
      setPasswordError(true)
    }

    if (email && password) {
      console.log(email, password)
      redirectToHome()
    }
  }


  return (
    <Box
      component="form"
      display="inline-block"
      alignItems="center"
      textAlign="center"
      noValidate
      autoComplete="off"
      sx={{ marginLeft: "auto", marginRight: "auto", marginTop: "5%" }}
      onSubmit={handleSubmit}
    >
      <Typography variant="h5" className="form-title">
        Connectez-vous :
      </Typography> <TextField
      label="Email"
      onChange={e => setEmail(e.target.value)}
      required
      variant="outlined"
      color="secondary"
      type="email"
      sx={{ mb: 3 }}
      fullWidth
      value={email}
      error={emailError}
      className="input-field"
    />
      <TextField
        label="Password"
        onChange={e => setPassword(e.target.value)}
        required
        variant="outlined"
        color="secondary"
        type="password"
        value={password}
        error={passwordError}
        fullWidth
        sx={{ mb: 3 }}
        className="input-field"
      />
      <Button variant="contained" color="primary" type="submit" className="submit-button"
      >Login</Button>
    </Box>
  );
}
const style = {
  margin: 15,
};


























