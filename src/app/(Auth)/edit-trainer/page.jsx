"use client";

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';

const UserProfilePage = () => {
    const [currentUser, setCurrentUser] = useState(() => JSON.parse(localStorage.getItem('currentUser')) || {});
    const [userDetails, setUserDetails] = useState({
      username: '',
      newPassword: '',
      confirmPassword: ''
    });
    const [trainerDetails, setTrainerDetails] = useState(null); // Set to null initially

    useEffect(() => {
      const fetchTrainerInfo = async () => {
        if (!currentUser || !currentUser._id) {
          console.log("No user logged in");
          return;
        }

        try {
          const response = await fetch('./trainer.json');
          const allTrainers = await response.json();
          const trainerData = allTrainers.find(trainer => trainer.username === currentUser._id);

          if (trainerData) {
            setTrainerDetails({
              trainerName: trainerData.trainerName || '',
              imgUrl: trainerData.imgUrl || ''
            });
          } else {
            console.log("No trainer found for the user");
            setTrainerDetails(null);  // Ensure trainer form is not displayed if no data is found
          }
        } catch (error) {
          console.error("Failed to fetch trainer data:", error);
          setTrainerDetails(null);
        }
      };

      fetchTrainerInfo();
    }, [currentUser]);

    const handleUserChange = (event) => {
      const { name, value } = event.target;
      setUserDetails(prevDetails => ({
        ...prevDetails,
        [name]: value
      }));
    };

    const handleTrainerChange = (event) => {
      const { name, value } = event.target;
      if (trainerDetails) { // Check if trainerDetails is not null
        setTrainerDetails(prevDetails => ({
          ...prevDetails,
          [name]: value
        }));
      }
    };

    const handleUserSubmit = (event) => {
      event.preventDefault();
      if (userDetails.newPassword !== userDetails.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      console.log('User Form is valid', userDetails);
      alert('User updated successfully!');
    };

    const handleTrainerSubmit = (event) => {
      event.preventDefault();
      if (trainerDetails) { // Check if trainerDetails is not null before submitting
        console.log('Trainer Form is valid', trainerDetails);
        alert('Trainer updated successfully!');
      }
    };

    return (
      <div className={styles.pageContainer}>
        <form className={styles.form} onSubmit={handleUserSubmit}>
          <h2>Modify User Details</h2>
          <label>
            Username:
            <input type="text" name="username" value={userDetails.username} onChange={handleUserChange} />
          </label>
          <label>
            New Password:
            <input type="password" name="newPassword" value={userDetails.newPassword} onChange={handleUserChange} />
          </label>
          <label>
            Confirm New Password:
            <input type="password" name="confirmPassword" value={userDetails.confirmPassword} onChange={handleUserChange} />
          </label>
          <button type="submit">Update User</button>
        </form>

        {trainerDetails && (
          <form className={styles.form} onSubmit={handleTrainerSubmit}>
            <h2>Modify Trainer Details</h2>
            <label>
              Trainer Name:
              <input type="text" name="trainerName" value={trainerDetails.trainerName} onChange={handleTrainerChange} />
            </label>
            <label>
              Photo URL:
              <input type="text" name="photoUrl" value={trainerDetails.imgUrl} onChange={handleTrainerChange} />
            </label>
            <button type="submit">Update Trainer</button>
          </form>
        )}
        
          <a href="./myaccount" className={styles.returnButton}>Return to Account</a>
        </div>
      );
    };
    
    export default UserProfilePage;
