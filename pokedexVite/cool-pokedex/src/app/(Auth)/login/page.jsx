"use client"

import Link from 'next/link';
import styles from './page.module.css';
import { useState } from 'react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Logging in with:', username, password);
  };

  return (
    <div className={styles.container}>

<div><img className={styles.logo} src="https://img1.picmix.com/output/stamp/normal/9/5/6/2/572659_6a4f7.gif" alt="test" srcset="" /></div>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <div className={styles.formGroup}>
          <label htmlFor="username">Username</label>
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
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className={styles.link}>
        <Link href="/myaccount">
          Login
        </Link>
      </div>
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
