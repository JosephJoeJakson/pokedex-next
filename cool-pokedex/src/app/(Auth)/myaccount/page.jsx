"use client";
import React, { useEffect, useState } from 'react';
import styles from './page.module.css';

const MyAccountPage = () => {
  const [trainerInfo, setTrainerInfo] = useState(null);
  const [pokemonsSeen, setPokemonsSeen] = useState([]);
  const [pokemonsCaught, setPokemonsCaught] = useState([]);

  const fetchTrainerInfo = async () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
      console.log("No user logged in");
      return; // Optionally redirect to login page
    }

    try {
      const response = await fetch('/trainer.json');
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
    localStorage.removeItem('currentUser'); // Remove the user from localStorage
    window.location.href = '/login'; // Redirect to login page
  };

  useEffect(() => {
    fetchTrainerInfo();
  }, []);

  return (
    <div className={styles.container}>
      {trainerInfo ? (
        <div className={styles.trainerInfo}>
          <div className={styles.trainerProfile}><img src={trainerInfo.imgUrl} alt="Trainer" /><p>{trainerInfo.trainerName}</p></div>
          <p>{trainerInfo.creationDate}</p>
        </div>
      ) : (
        <div>
          <p>No trainer profile found. Would you like to <a href="/create-trainer">create one</a>?</p>
        </div>
      )}
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
      <button onClick={handleLogout} className={styles.logoutButton}>Logout</button> {/* Logout button */}
    </div>
  );
};

export default MyAccountPage;
