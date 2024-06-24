import * as React from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useState } from "react";
import axios from '../../axiosConfig'; // Importez la configuration Axios

type RedirectToHome = () => void;

interface LoginProps {
  redirectToHome: RedirectToHome;
}

export default function Login({ redirectToHome }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setEmailError(false);
    setPasswordError(false);
    setMessage("");

    if (email === '') {
      setEmailError(true);
    }
    if (password === '') {
      setPasswordError(true);
    }

    if (email && password) {
      try {
        const response = await axios.post('http://localhost:8000/api/login/', {
          username: email,
          password: password,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          setMessage('Logged in successfully');
          redirectToHome();
        } else {
          setMessage('Invalid credentials');
        }
      } catch (error) {
        setMessage('Invalid credentials');
      }
    }
  };

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
      </Typography>
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
      {message && (
        <Typography variant="body2" color="error" className="error-message">
          {message}
        </Typography>
      )}
    </Box>
  );
}


const style = {
  margin: 15,
};


























