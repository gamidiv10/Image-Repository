import React, { useState } from "react";
import passwordHash from "password-hash";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import {Button, TextField, Link} from '@material-ui/core';


export default function Login(){
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

  const handleUserId = (event) => {
    setUserId(event.target.value);
  }
  const handlePassword = (event) => {
    setPassword(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(`/users/${userId}`)
      .then((response) => {
        console.log("Success", response.data.data.password);
        let passwordVerified = passwordHash.verify(password, response.data.data.password)
        passwordVerified ? history.push('/home') : console.log("Incorrect Password")

      })
      .catch((error) => console.log(error.message));

  }
  const handleRegister = (event) => {
    event.preventDefault();
    history.push('/register')

    }
    return (
      <div>
        <h1 className="h1">Image Repository</h1>
        <form onSubmit={handleSubmit} className="registrationForm">
          <TextField type="text" name="userId" placeholder="User ID" 
          onChange={handleUserId} required variant="outlined" color="secondary"></TextField>
          <br />
          <br />
          <TextField
            type="password" name="password"
            placeholder="Password"
            onChange={handlePassword}
            required variant="outlined" color="secondary"
          />
          <br />
          <br />
          <Button type="submit" color="primary" variant="outlined">Login</Button>
          <br />
          <br />
          <Link href="#" onClick={handleRegister} color="inherit">
          <label className="inputLabel">Don't have an account?  </label>
          Register</Link>
        </form>
      </div>
    );
  }
