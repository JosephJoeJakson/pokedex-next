"use client";

import React from 'react';
import styles from './page.module.css'; // Assume you have some basic styling in place

const AboutPage = () => {
  return (
    <div className={styles.container}>
      <h1>About Us</h1>
      <p>
        Welcome to our application! This app is designed to provide Pokémon trainers like you
        with all the tools necessary to track, manage, and enhance your Pokémon training experience.
      </p>
      <p>
        Our mission is to make Pokémon training accessible to everyone, easy to manage, and fun. We believe
        that by providing a comprehensive set of tools and resources, we can help trainers of all levels
        achieve their goals.
      </p>
      <h2>Our Team</h2>
      <p>
        The development of this app was led by a dedicated team of Pokémon enthusiasts and expert developers
        who are passionate about creating engaging and useful tools for the community. Our team members come
        from diverse backgrounds and bring a broad range of expertise to the table.
      </p>
      <h2>Contact Us</h2>
      <p>
        Have questions or feedback? Wed love to hear from you! You can reach out to us at:
        <a href="mailto:support@exemple.com">support@exemple.com</a>
      </p>
    </div>
  );
};

export default AboutPage;
