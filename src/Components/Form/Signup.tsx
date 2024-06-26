import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import VehicleSelection from "../vehiculeSelector/VehicleSelecton";

type setSignIn = () => void

export default function Signup({setSignIn} : {setSignIn : setSignIn})  {
  const [email, setEmail] = useState("")
  const [type, setType] = useState<string[]>([])
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordCofirm] = useState("")
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [passwordConfirmError, setPasswordCofirmError] = useState(false)
  const [nameError, setNameError] = useState(false)
  const [surnameError, setSurnameError] = useState(false)

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault()

    setEmailError(false)
    setPasswordError(false)
    setPasswordCofirmError(false)
    setSurnameError(false)
    setNameError(false)

    if (email == '') {
      setEmailError(true)
    }
    if (password == '') {
      setPasswordError(true)
    }
    if (passwordConfirm == '') {
      setPasswordCofirmError(true)
    }
    if (name == '') {
      setNameError(true)
    }
    if (surname == '') {
      setSurnameError(true)
    }
    if (email && password) {
      console.log(email, password)
    }
  }

  const handleTypeChange = (selectedTypes: string[]) => {
    setType(selectedTypes);
  };

  return (
    <Box
      component="form"
      display="inline-block"
      alignItems="center"
      noValidate
      autoComplete="off"
      sx={{ marginLeft: "auto", marginRight: "auto" }}
    >
      <form autoComplete="off" onSubmit={handleSubmit}>
        <h3>Créer votre compte</h3>
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
          label="Mot de passe"
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
        <TextField
          label="comfirmez votre mot de passe"
          onChange={e => setPasswordCofirm(e.target.value)}
          required
          variant="outlined"
          color="secondary"
          type="password"
          value={passwordConfirm}
          error={passwordConfirmError}
          fullWidth
          sx={{ mb: 3 }}
        />
        <TextField
          label="Nom"
          onChange={e => setName(e.target.value)}
          required
          variant="outlined"
          color="secondary"
          type="text"
          value={name}
          error={nameError}
          fullWidth
          sx={{ mb: 3 }}
        />
        <TextField
          label="Prénom"
          onChange={e => setSurname(e.target.value)}
          required
          variant="outlined"
          color="secondary"
          type="text"
          value={surname}
          error={surnameError}
          fullWidth
          sx={{ mb: 3 }}
        />
        <Typography variant="subtitle1" sx={{ marginTop: 2, textAlign: "left" }}>
          Préférence véhicule
        </Typography>
        <VehicleSelection selectedTypes={type} onChange={handleTypeChange} />
        <Button variant="contained" color="primary" type="submit">Créer votre compte</Button>
        <p>vous possédez déjà un compte ? <a href='#' onClick={setSignIn}>connectez vous</a></p>
      </form>
    </Box>
  );
}








