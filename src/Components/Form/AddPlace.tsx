import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TextField, Button, Box, Autocomplete } from '@mui/material';


const organisation = [
  { label: 'ESGI', value: 1 },
  { label: 'Toto', value: 2 },
  { label: 'tata', value: 3 },
]

const building = [
  { label: 'building 1', value: 1 },
  { label: 'building 2', value: 2 },
  { label: 'building 3', value: 3 },
]


export default function AddPlace() {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));
  const [email, setEmail] = useState("")
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
        <h3>Créez npm start </h3>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={organisation}
          sx={{ mb: 3 }}
          renderInput={(params) => <TextField {...params} label="Organisation" />}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={building}
          sx={{ mb: 3 }}
          renderInput={(params) => <TextField {...params} label="Building" />}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateField
          label="date"
          sx={{ mb: 3 }}
          onChange={(newValue) => setValue(newValue)}
        />
          </LocalizationProvider >
        <TextField
          label="Nom"
          onChange={e => setName(e.target.value)}
          required
          variant="outlined"
          color="secondary"
          type="password"
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
          type="password"
          value={surname}
          error={surnameError}
          fullWidth
          sx={{ mb: 3 }}
        />
        <Button variant="contained" color="primary" type="submit">sign in</Button>
      </form>
    </Box>
  );
}