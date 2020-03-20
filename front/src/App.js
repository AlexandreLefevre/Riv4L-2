import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

const axios = require('axios');


function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const creatAccont =() => {
    console.log('email =>', email);
  console.log('password =>', password);
  axios.get(`http://localhost:4000/createAccount?email=${email}&password=${password}`)
  .then((response) => {
    console.log(response);

  })

  }
  return (
    <div className="App">
      <p>Email1</p>
      <input onChange={(e) => { setEmail(e.target.value) }} />
      <p>password1</p>
      <input onChange={(e) => { setPassword(e.target.value) }} />
      <button onClick={creatAccont}>Cree</button>
    </div>
  );
}

export default App;
