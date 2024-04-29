"use client";

import React, { useEffect, useState } from 'react';
import styles from './page.module.css';

const PokemonPage = () => {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterBarOpen, setIsFilterBarOpen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);

  // Assuming Pokémon types are static for demonstration
  const types = ['NORMAL', 'FIRE', 'WATER', 'ELECTRIC', 'GRASS','ICE', 'FIGHTING', 'POISON', 'GROUND', 'FLYING','PSYCHIC', 'BUG', 'ROCK', 'GHOST', 'DRAGON','DARK', 'STEEL', 'FAIRY'];
  
    const fetchPokemon = async () => {
      try {
        const response = await fetch('/PkmnData.json');
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
  

  const toggleType = (type) => {
    const newSelectedTypes = selectedTypes.includes(type) ?
      selectedTypes.filter(t => t !== type) :
      [...selectedTypes, type].slice(0, 2); // Ensure only up to 2 types can be selected

    setSelectedTypes(newSelectedTypes);
  };

  const applyFilters = () => {
    fetchPokemon({ partialName: searchTerm, types: selectedTypes });
    setIsFilterBarOpen(false);
  };

  const clearFilters = () => {
    setSelectedTypes([]);
    setSearchTerm('');
    fetchPokemon();
  };

  const selectPokemon = (pokemon) => {
    console.log("Selected Pokemon:", pokemon);
    if (!pokemon) return;
  
    const safePokemon = {
      ...pokemon,
      types: pokemon.types || [],
      regions: pokemon.regions || []
    };
  
    setSelectedPokemon(safePokemon);
    setIsModalOpen(true);
  };
  


  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleFilterBar = () => {
    setIsFilterBarOpen(!isFilterBarOpen);
  };

  return (
    <div className={styles.container}>


{isModalOpen && selectedPokemon && (
  <div className={styles.modal}>

    <div className={styles.modalContent}>
    <span className={styles.closeButton} onClick={closeModal}>&times;</span>
      <h1 className={styles.pokemonName}>{selectedPokemon.name}</h1>
      <img src={selectedPokemon.imgUrl} alt={selectedPokemon.name} className={styles.pokemonImage} />
      <p className={styles.pokemonDescription}>{selectedPokemon.description}</p>
      <div className={styles.types}>
        <h3>Types</h3>
        {selectedPokemon.types && selectedPokemon.types.length > 0 ? (
          selectedPokemon.types.map((type, index) => (
            <span key={index} className={`${type} type`}>
              {type}

            </span>
          ))
        ) : (
          <span>No types listed</span>
        )}
      </div>
      <div className={styles.pokemonRegions}>
        <h3>Region</h3>
        {selectedPokemon.regions && selectedPokemon.regions.length > 0 ? (
          selectedPokemon.regions.map((region, index) => (
            <span key={index} className={styles.region}>
              {region.regionName} (#{region.regionNumber})
            </span>
          ))
        ) : (
          <span>No regions listed</span>
        )}
      </div>
    </div>
  </div>
)}



      <div className={styles.search}>
        <img src="./search.png" alt="search-icon" className={styles.searchIcon} onClick={applyFilters}/>
        <input
          type="text"
          name="search"
          id="search"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <img src="./search.webp" alt="filter-icon" className={styles.filterIcon} onClick={toggleFilterBar}/>
      </div>

      {isFilterBarOpen && (
        <div className={styles.filterBar}>
          {types.map((type, index) => (
            <label key={index} className={`${type} ${styles.filterLabel} ${selectedTypes.length === 2 && !selectedTypes.includes(type) ? styles.dim : ''}`} >
              <input
                type="checkbox"
                checked={selectedTypes.includes(type)}
                onChange={() => toggleType(type)}
      
              />
              <span>{type}</span>
            </label>
          ))}
          <button onClick={clearFilters}>Effacer</button>
          <button onClick={applyFilters}>Appliquer</button>
        </div>
      )}

      {pokemons.length === 0 && (
        <div className={styles.emptyRequest}>
          <img src="./loading.gif" alt="Empty Request" className={styles.notfound} />
          <p>No pokemon found</p>
        </div>
      )}

      <div className={styles.list}>
        {pokemons.map((pokemon, index) => (
          <div key={index} className={`${pokemon.types[0]} ${styles.pokemonCard}`} onClick={() => selectPokemon(pokemon)}>
            <img className={styles.pokemonListImage} src={pokemon.imgUrl} alt={pokemon.name} />
            <div className={styles.pokemonListInfo}>
              <p className={styles.pokemonListName}>{pokemon.name}</p>
              <ul className={styles.pokemonListTypes}>
                {pokemon.types.map((type, typeIndex) => (
                  <li className={`${type} type`} key={typeIndex}>{type}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonPage;


















