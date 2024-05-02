"use client"

import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const userData = {
      username,
      email,
      password
    };

    try {
      const response = await fetch('ttp://localhost:8080/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        console.log('User registered successfully');
        window.location.href = '/login';
      } else {
        console.error('Failed to register user');
      }
    } catch (error) {
      console.error('Error registering user:', error);
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
          <label htmlFor="username">Username : </label>
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
          <label htmlFor="email">Email : </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password : </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.loginButton}>
          Register
        </button>
      </form>
      <div className={styles.link}>
        <Link href="/login">
          Already have an account? Login
        </Link>
      </div>
    </div>
    </div>
  );
};

export default RegisterPage;
