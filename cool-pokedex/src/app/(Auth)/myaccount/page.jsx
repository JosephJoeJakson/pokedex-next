"use client";
import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import DeleteConfirmationModal from './DeleteConfirmationModal';


const MyAccountPage = () => {
  const [currentUser, setCurrentUser] = useState(() => JSON.parse(localStorage.getItem('currentUser')) || {});
  const [trainerInfo, setTrainerInfo] = useState(null);
  const [pokemonsSeen, setPokemonsSeen] = useState([]);
  const [pokemonsCaught, setPokemonsCaught] = useState([]);
  const [showDeleteProfileModal, setShowDeleteProfileModal] = useState(false);
  const [showDeleteTrainerModal, setShowDeleteTrainerModal] = useState(false);

  useEffect(() => {
    fetchTrainerInfo();
  }, []); // Dependencies array is empty, meaning this runs only once when the component mounts.

  const fetchTrainerInfo = async () => {
    if (!currentUser || !currentUser._id) {
      console.log("No user logged in");
      return; // Optionally redirect to login page or handle accordingly
    }

    try {
      const response = await fetch('./trainer.json');
      const allTrainers = await response.json();
      const trainerData = allTrainers.find(trainer => trainer.username === currentUser._id);

      if (trainerData) {
        setTrainerInfo({
          username: trainerData.username,
          trainerName: trainerData.trainerName,
          imgUrl: trainerData.imgUrl,
          creationDate: new Date(trainerData.creationDate['$date']).toLocaleDateString(),
        });
        setPokemonsSeen(trainerData.pkmnSeen);
        setPokemonsCaught(trainerData.pkmnCatch);
      } else {
        console.log("No trainer found for the user");
      }
    } catch (error) {
      console.error("Failed to fetch trainer data:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser'); // Clear user session
    window.location.href = '/login'; // Redirect to login page
  };


  const deleteProfile = async () => {
  try {
    const response = await fetch('/api/user/delete', { method: 'DELETE' });
      alert('Profile deleted successfully.');
 
  } catch (error) {
    console.error('Error deleting profile:', error);
    alert('Failed to delete profile.');
  }
  setShowDeleteProfileModal(false);  // Close the modal after action
};

const deleteTrainer = async () => {
  try {
    const response = await fetch('/api/trainer/delete', { method: 'DELETE' });

      alert('Trainer deleted successfully.');

  } catch (error) {
    console.error('Error deleting trainer:', error);
    alert('Failed to delete trainer.');
  }
  setShowDeleteTrainerModal(false);  // Close the modal after action
};

  return (
      <div className={styles.container}>
        <div className={styles.userInfo}>
          <p>Welcome to your account {currentUser._id}</p>
          <a className={styles.modifyButton} href="/edit-trainer">
  Modify account
</a>
        </div>

        {trainerInfo ? (
          <>
            <div className={styles.trainerInfo}>
              <div className={styles.trainerProfile}>
                <img src={trainerInfo.imgUrl} alt="Trainer" />
                <p>{trainerInfo.trainerName}</p>
              </div>
              <p>{trainerInfo.creationDate}</p>
            </div>
            <div className={styles.pokemonCount}>
              <h2>Seen:</h2>
              <ul>
                {pokemonsSeen.length > 0 ? (
                  pokemonsSeen.map((pokemon, index) => (
                    <li key={index}>{pokemon.name} - Seen</li>
                  ))
                ) : (
                  <li>None</li>
                )}
              </ul>
    
              <h2>Caught:</h2>
              <ul>
                {pokemonsCaught.length > 0 ? (
                  pokemonsCaught.map((pokemon, index) => (
                    <li key={index}>{pokemon.name} - Caught</li>
                  ))
                ) : (
                  <li>None</li>
                )}
              </ul>
            </div>
            <button onClick={() => setShowDeleteTrainerModal(true)}>Delete Trainer</button>
          </>
        ) : (
          <div>
            <p>No trainer profile found. Create one here : <a href="/create-trainer">Create</a></p>
          </div>
        )}
    
        <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
        <a href="/edit-trainer">Edit Trainer</a>
        <button onClick={() => setShowDeleteProfileModal(true)}>Delete Profile</button>
    
        <DeleteConfirmationModal
          isOpen={showDeleteProfileModal}
          onClose={() => setShowDeleteProfileModal(false)}
          onConfirm={deleteProfile}
          message="Are you sure you want to delete your profile?"
        />
    
        <DeleteConfirmationModal
          isOpen={showDeleteTrainerModal}
          onClose={() => setShowDeleteTrainerModal(false)}
          onConfirm={deleteTrainer}
          message="Are you sure you want to delete this trainer?"
        />
      </div>
    );
}

export default MyAccountPage;
