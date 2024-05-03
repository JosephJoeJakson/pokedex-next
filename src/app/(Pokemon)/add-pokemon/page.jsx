"use client";

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';

const  AddPokemonPage = () => {
  const [pokemon, setPokemon] = useState({
    name: '',
    description: '',
    imgUrl: '',
    types: [],
    regions: [{ regionName: '', regionNumber: '' }]
  });
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('currentUser'));
    setCurrentUser(userData);

    setPokemon({
      name: '',
      description: '',
      imgUrl: '',
      types: [],
      regions: [{ regionName: '', regionNumber: '' }]
    });
  }, []);

  const handleChange = (field, value) => {
    if (!currentUser || !currentUser.admin) {
      return;
    }
    setPokemon(prev => ({ ...prev, [field]: value }));
  };

  const handleRegionChange = (index, field, value) => {
    if (!currentUser || !currentUser.admin) {
      return;
    }
    const updatedRegions = pokemon.regions.map((region, i) => {
      if (i === index) {
        return { ...region, [field]: value };
      }
      return region;
    });
    setPokemon(prev => ({ ...prev, regions: updatedRegions }));
  };

  const addRegion = () => {
    if (!currentUser || !currentUser.admin) {

      return;
    }
    setPokemon(prevState => ({
      ...prevState,
      regions: [...prevState.regions, { regionName: '', regionNumber: '' }]
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!currentUser || !currentUser.admin) {

      return;
    }

      window.location.href = './'; 
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>Name:
        <input type="text" value={pokemon.name} onChange={(e) => handleChange('name', e.target.value)} />
      </label>
      <label>Description:
        <textarea value={pokemon.description} onChange={(e) => handleChange('description', e.target.value)} />
      </label>
      <label>Image URL:
        <input type="text" value={pokemon.imgUrl} onChange={(e) => handleChange('imgUrl', e.target.value)} />
      </label>
      <div className={styles.typeContainer}>

          <label key={1}>Type 1:
            <input type="text" value={pokemon.type1} />
          </label>
          <label key={2}>Type 2:
            <input type="text" value={pokemon.type2}   />
          </label>
      
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
      <button type="submit" className={styles.submitButton}>Create Pokemon</button>
    </form>
  );
};

export default AddPokemonPage;
