"use client"
import React, { useEffect, useState } from 'react';
import styles from './page.module.css';

const MyAccountPage = () => {
  const [trainerInfo, setTrainerInfo] = useState(null);
  const [pokemonsSeen, setPokemonsSeen] = useState([]);
  const [pokemonsCaught, setPokemonsCaught] = useState([]);

  const fetchTrainerInfo = async () => {
    try {
      const response = await fetch('/Trainer.json');
      const data = await response.json();
      setTrainerInfo({
        username: data.username,
        trainerName: data.trainerName,
        imgUrl: data.imgUrl,
        creationDate: new Date(data.creationDate['$date']).toLocaleDateString(),
      });
      setPokemonsSeen(data.pkmnSeen);
      setPokemonsCaught(data.pkmnCatch);
    } catch (error) {
      console.error("Failed to fetch trainer data:", error);
    }
  };

  useEffect(() => {
    fetchTrainerInfo();
  }, []);

  return (
    <div className={styles.container}>
      {trainerInfo && (
        <div className={styles.trainerInfo}>
          <div className={styles.trainerProfile}><img src={trainerInfo.imgUrl} alt="Trainer" /> <p>{trainerInfo.trainerName}</p></div>
     
      
          <p>{trainerInfo.creationDate}</p>
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
    </div>
  );
};

export default MyAccountPage;
