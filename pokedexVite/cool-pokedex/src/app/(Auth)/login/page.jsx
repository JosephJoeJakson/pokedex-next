"use client";

// Import
import Link from 'next/link';
import styles from './page.module.css';
import { useState, useEffect } from 'react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('./user.json')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error loading the users data:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Logging in with:', username, password);

    const user = users.find(user => user._id == username);

    if (user) {
      console.log("Login successful");  
      alert("Login Successful!");
      window.location.href = '/myaccount';
    } else {
      console.error("Login failed");
      alert("Login Failed: Unauthorized");
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <img className={styles.logo} src="https://img1.picmix.com/output/stamp/normal/9/5/6/2/572659_6a4f7.gif" alt="PKMN LOGO" />
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
  );
};

export default LoginPage;