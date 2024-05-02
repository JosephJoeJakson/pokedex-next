"use client";

import Link from 'next/link';
import styles from './page.module.css';
import { useState, useEffect } from 'react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Check if user is already logged in
    const loggedUser = localStorage.getItem('currentUser');
    if (loggedUser) {
      window.location.href = '/myaccount'; // Redirect to account page if already logged in using window.location.href
    }

    // Load users data
    fetch('./user.json')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error loading the users data:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = users.find(user => user._id === username && user.password === password);

    if (user) {
      console.log("Login successful");
      localStorage.setItem('currentUser', JSON.stringify(user)); // Save user data in localStorage
      window.location.href = '/myaccount'; // Redirect to account page after login using window.location.href
    } else {
      console.error("Login failed");
      alert("Login Failed: Incorrect Username or Password");
    }
  };

  return (
    <div className={styles.container}>
       <div className={styles.innerContainer}>
      <div>
        <img className={styles.logo} src="https://ser-dialest.github.io/GifTastic/assets/images/PokemonLogo.png" alt="PKMN LOGO" />
      </div>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <div className={styles.formGroup}>
          <label htmlFor="username">Username :</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password :</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.loginButton}>Login</button>
      </form>
      <div className={styles.link}>
        <Link href="/register">
          Register
        </Link>
      </div>
      </div>
    </div>
  );
};

export default LoginPage;
