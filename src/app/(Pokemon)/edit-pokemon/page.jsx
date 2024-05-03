"use client";

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';

const EditPokemonPage = () => {
  const [pokemon, setPokemon] = useState({
    name: '',
    description: '',
    imgUrl: '',
    types: [],
    regions: [{ regionName: '', regionNumber: '' }]
  });

  useEffect(() => {
    // Extracting the Pokemon ID from the URL query parameter
    const queryParams = new URLSearchParams(window.location.search);
    const pokemonId = queryParams.get('pkm');

    const fetchPokemonData = async () => {
      try {
        const response = await fetch('./PkmnData.json');
        const pokemons = await response.json();
        const specificPokemon = pokemons.find(p => p._id.$oid === pokemonId);
        if (specificPokemon) {
          setPokemon({
            ...specificPokemon,
            regions: specificPokemon.regions.length > 0 ? specificPokemon.regions : [{ regionName: '', regionNumber: '' }]
          });
        } else {
          console.error('No Pokemon found with the given ID');
        }
      } catch (error) {
        console.error('Failed to fetch Pokemon data:', error);
      }
    };

    fetchPokemonData();
  }, []);

  const handleRegionChange = (index, field, value) => {
    const updatedRegions = pokemon.regions.map((region, i) => {
      if (i === index) {
        return { ...region, [field]: value };
      }
      return region;
    });
    setPokemon({ ...pokemon, regions: updatedRegions });
  };

  const addRegion = () => {
    setPokemon(prevState => ({
      ...prevState,
      regions: [...prevState.regions, { regionName: '', regionNumber: '' }]
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

      console.log('Form is valid');
      window.location.href = './';
  };
 
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>Name:
        <input type="text" value={pokemon.name} readOnly />
      </label>
      <label>Description:
        <textarea value={pokemon.description} readOnly />
      </label>
      <label>Image URL:
        <input type="text" value={pokemon.imgUrl} readOnly />
      </label>
      <div className={styles.typeContainer}>
        {pokemon.types.map((type, index) => (
          <label key={index}>Type {index + 1}:
            <input type="text" value={type} readOnly />
          </label>
        ))}
      </div>
      {pokemon.regions.map((region, index) => (
        <div className={styles.regionContainer} key={index}>
          <label>Region Name:
            <input 
              type="text" 
              value={region.regionName} 
              onChange={(e) => handleRegionChange(index, 'regionName', e.target.value)}
            />
          </label>
          <label>Region Number:
            <input 
              type="number" 
              value={region.regionNumber} 
              onChange={(e) => handleRegionChange(index, 'regionNumber', e.target.value)}
            />
          </label>
        </div>
      ))}
      <button type="button" className={styles.addButton} onClick={addRegion}>Add Another Region</button>
      <button type="submit" className={styles.submitButton}>Edit changes</button>
    </form>
  );
};

export default EditPokemonPage;
