"use client"

import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(''); // Added for registration
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you'd typically send a request to your backend to register the user
    console.log('Registering with:', username, email, password);

    // Assuming registration is successful, you can redirect the user, for example to the login page
    // router.push('/login');
  };

  return (
    <div className={styles.container}>
      <h2>Register</h2> {/* Header for clarity */}
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
        <div className={styles.formGroup}> {/* Email input field */}
          <label htmlFor="email">Email</label>
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
        <Link href="/login" className={styles.loginButton}>
          Register
        </Link>
      </form>
      <div className={styles.link}>
        <Link href="/login">
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
