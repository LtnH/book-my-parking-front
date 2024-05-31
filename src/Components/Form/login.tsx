import * as React from 'react';
import { AppBar, Drawer, MenuItem, IconButton, Paper, TextField, Button, Box } from '@mui/material';
import { SetStateAction, useState } from "react";
import firebase from "firebase/compat";

type redirectToHome  = () => void
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
      noValidate
      autoComplete="off"
      sx={{ marginLeft: "auto", marginRight: "auto" }}
      onSubmit={handleSubmit}
    >
      <h3>Connection</h3>
      <TextField
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
      />
      <Button variant="contained" color="primary" type="submit">Login</Button>
    </Box>
  );
}
const style = {
  margin: 15,
};


























