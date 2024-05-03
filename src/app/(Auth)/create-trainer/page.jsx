"use client";

import React, { useEffect, useState } from 'react';
import styles from './page.module.css';

const CreateTrainerPage = () => {
  const [trainerData, setTrainerData] = useState({
    trainerName: '',
    imgUrl: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
      window.location.href = '/login'; // Redirect to login page
      return;
    }

    // Simulate fetching existing trainer info for the logged-in user
    fetch('/trainer.json')
      .then(response => response.json())
      .then(trainers => {
        const userTrainer = trainers.find(trainer => trainer.username === currentUser._id);
        if (userTrainer) {
          alert("You already have a trainer profile.");
          window.location.href = '/myaccount'; // Redirect to account page or other appropriate page
        }
      })
      .catch(error => {
        console.error("Failed to fetch trainers:", error);
      });
  });


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTrainerData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    if (!trainerData.trainerName) {
      errors.trainerName = 'Trainer name is required';
      formIsValid = false;
    }

    if (!trainerData.imgUrl) {
      errors.imgUrl = 'Image URL is required';
      formIsValid = false;
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      console.log('Form is valid');
      window.location.href = '/myaccount';

    } else {
        
      console.log('Form is invalid');
      alert('Please fill all required fields.');
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>Create Trainer Profile</h1>
        
        <div className={styles.formGroup}>
          <label htmlFor="trainerName">Trainer Name:</label>
          <input
            type="text"
            id="trainerName"
            name="trainerName"
            value={trainerData.trainerName}
            onChange={handleInputChange}
            className={errors.trainerName ? styles.inputError : ''}
          />
          {errors.trainerName && <p className={styles.errorText}>{errors.trainerName}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="imgUrl">Image URL:</label>
          <input
            type="text"
            id="imgUrl"
            name="imgUrl"
            value={trainerData.imgUrl}
            onChange={handleInputChange}
            className={errors.imgUrl ? styles.inputError : ''}
          />
          {errors.imgUrl && <p className={styles.errorText}>{errors.imgUrl}</p>}
        </div>

        <button type="submit" className={styles.submitButton}>Create Trainer</button>
      </form>
    </div>
  );
};

export default CreateTrainerPage;
