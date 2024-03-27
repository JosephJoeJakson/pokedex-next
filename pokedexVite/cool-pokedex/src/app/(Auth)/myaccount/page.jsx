"use client"

import React, { useEffect, useState } from 'react';
import styles from './page.module.css';

const MyAccountPage = () => {
  const [trainerInfo, setTrainerInfo] = useState(null);
  const [pokemons, setPokemons] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Assuming you'll use this for something

  const fetchPokemon = async () => {
    try {
      const response = await fetch('/Trainer.json');
      const data = await response.json();
      setTrainerInfo(data.trainer);
      setPokemons(data.pokemons);
    } catch (error) {
      console.error("Failed to fetch trainer and Pokémon data:", error);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  return (
    <div className={styles.container}>
      <h2>Your Trainer:</h2>
      {trainerInfo && (
        <div>
          <p>Name: {trainerInfo.name}</p>
          <p>Age: {trainerInfo.age}</p>
          <p>Hometown: {trainerInfo.hometown}</p>
        </div>
      )}

      <h2>Your Pokémons:</h2>
    </div>
  );
};

export default MyAccountPage;
