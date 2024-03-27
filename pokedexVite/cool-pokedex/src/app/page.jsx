"use client"
import React, { useEffect, useState } from 'react';
import styles from './page.module.css';

const PokemonPage = () => {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingOpen, setIsSettingOpen] = useState(false);

  const fetchPokemon = async () => {
    try {
      const response = await fetch('/pokemon_data_100.json');
      const data = await response.json();
      setPokemons(data);
      setIsModalOpen(true); 
    } catch (error) {
      console.error("Failed to fetch Pokémon data:", error);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  const selectPokemon = (pokemon) => {
    setSelectedPokemon(pokemon);
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false); 
  };

  const closeSetting = () => {
    setIsSettingOpen(false); 
  };

  return (
    <div className={styles.container}>

 
      {isModalOpen && selectedPokemon && (
        <div className={styles.modal}>
        
            <span className={styles.closeButton} onClick={closeModal}>&times;</span>
            <img className={styles.image} src={selectedPokemon.imgUrl} alt={selectedPokemon.name} />
            <div className={styles.modalContent}>
            <h1>{selectedPokemon.name}</h1>
            <p>{selectedPokemon.description}</p>
            <h3>Types</h3>
            <ul className={styles.infoList}>
              {selectedPokemon.types.map((type, index) => (
                <li key={index}>{type}</li>
              ))}
            </ul>
            <h3>Regions</h3>
            <ul className={styles.infoList}>
              {selectedPokemon.regions.map((region, index) => (
                <li key={index}>{region.regionName}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

{isSettingOpen && (
        <div className={styles.setting}>
        
            <span className={styles.closeButtonSetting} onClick={closeSetting}>&times;</span>
           
        </div>
      )}

                
      <div>
      <div>Search :</div>
      <input type="text" name="search" id="search"/>
      </div>
      <div className={styles.list}>
        {pokemons.map((pokemon, index) => (
          <div key={index} className={styles.pokemonCard} onClick={() => selectPokemon(pokemon)}>
            <img className={styles.pokemonListImage} src={pokemon.imgUrl} alt={pokemon.name} />
            {pokemon.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonPage;
