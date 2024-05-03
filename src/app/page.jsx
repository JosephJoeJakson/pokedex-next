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
  const [types, setTypes] = useState([]);
  const [pokemonStatuses, setPokemonStatuses] = useState({}); // Object to track seen and caught status
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminCommands, setShowAdminCommands] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [pokemonToDelete, setPokemonToDelete] = useState(null);
  



  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const userData = JSON.parse(currentUser);
      setIsLoggedIn(true);
      setIsAdmin(userData.admin); // Assume isAdmin is a boolean in your user data
    }
  
    const storedTypes = localStorage.getItem('types');
    if (storedTypes) {
      setTypes(Object.values(JSON.parse(storedTypes)));
    } else {
      fetchTypes();
    }
  
    const localPokemons = localStorage.getItem('pokemons');
    if (localPokemons) {
      setPokemons(JSON.parse(localPokemons));
    } else {
      fetchPokemon();
    }
  }, []);
  

  const fetchTypes = async () => {
    try {
      const response = await fetch('/types.json');
      const data = await response.json();
      setTypes(Object.values(data)); // Convert object to array before setting state
      localStorage.setItem('types', JSON.stringify(data)); // Store data as is in localStorage
    } catch (error) {
      console.error("Failed to fetch types:", error);
    }
  };

  const fetchPokemon = async () => {
    try {
      const response = await fetch('/PkmnData.json');
      const data = await response.json();
      setPokemons(data);
      localStorage.setItem('pokemons', JSON.stringify(data));
      initializePokemonStatus(data, currentUser);
    } catch (error) {
      console.error("Failed to fetch Pokémon data:", error);
    }
  };


  const initializePokemonStatus = (pokemons, user) => {
    const initialStatus = {};
    pokemons.forEach(pokemon => {
      initialStatus[pokemon._id] = {
        seen: user.pkmnSeen.includes(pokemon._id),
        caught: user.pkmnCatch.includes(pokemon._id)
      };
    });
    setPokemonStatuses(initialStatus);
  };

 


  const togglePokemonStatus = (id) => {
    console.log("togglePokemonStatus called with ID:", id);    const stringId = id.$oid;
    const currentStatus = pokemonStatuses[stringId] || { seen: false, caught: false };

    let newStatus = {};
    if (!currentStatus.seen && !currentStatus.caught) {
        newStatus = { seen: true, caught: false };
    } else if (currentStatus.seen && !currentStatus.caught) {
        newStatus = { seen: true, caught: true };
    } else {
        newStatus = { seen: false, caught: false };
    }

    setPokemonStatuses(prevStatuses => ({
        ...prevStatuses,
        [stringId]: newStatus
    }));
};


  

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
        <div className={`${styles.modalContent} ${selectedPokemon.types[0]}`}>
          <span className={styles.closeButton} onClick={closeModal}>&times;</span>
          <h1 className={styles.pokemonName}>{selectedPokemon.name}</h1>
          <img src={selectedPokemon.imgUrl} alt={selectedPokemon.name} className={styles.pokemonImage} />
          <p className={styles.pokemonDescription}>{selectedPokemon.description}</p>
          <div className={styles.infoTypes}>
            <h3>Types</h3>
            {selectedPokemon.types && selectedPokemon.types.length > 0 ? (
              selectedPokemon.types.map((type, index) => (
                <span key={index} className={`${[type]} type`}>
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
        {isLoggedIn && isAdmin && (
        <button className={styles.adminToggle} onClick={() => setShowAdminCommands(prev => !prev)}>
            {showAdminCommands ? "Hide Tools" : "Show Tools"}
        </button>
    )}
      </div>
 
      {isFilterBarOpen && (
        <div className={styles.filterBar}>
          <div className={styles.selectorContainer}>
          {types.map((type, index) => (
            <label key={index} className={`${styles.filterLabel} ${selectedTypes.includes(type) ? styles.active : selectedTypes.length >= 2 && !selectedTypes.includes(type) ? styles.dim : ''}`}>
            <input
              type="checkbox"
              checked={selectedTypes.includes(type)}
              onChange={() => toggleType(type)}
              style={{ display: 'none' }}  // Hide the default checkbox
            />
            <span className={`${type} ${styles.typeBadge}`}>{type}</span>
          </label>
        ))}
      </div>
      <div className={styles.selectorContainer}>
        <label htmlFor="pageSize">Pokémon per page:</label>
        <select id="pageSize" className={styles.selector}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>

        <label htmlFor="sortBy">Sort by:</label>
        <select id="sortBy" className={styles.selector} >
          <option value="name">Name Ascending</option>
          <option value="name">Name Descending</option>
          <option value="type">Type</option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
      <div className={styles.selectorContainer}>
          <button className={styles.clearButton} onClick={clearFilters}>Effacer</button>
          <button className={styles.applyButton} onClick={applyFilters}>Appliquer</button>
      </div>
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
   
    <div key={index} className={styles.pokemonEntry}>
  {isLoggedIn && isAdmin && showAdminCommands && (
    <div className={`${pokemon.types[0]} ${styles.adminTools}`}>
     <a className={styles.modifyButton} href={`/edit-pokemon?pkm=${encodeURIComponent(pokemon._id.$oid)}`}>
  Modify
</a>

      <button className={styles.deleteButton} onClick={() => {
    setPokemonToDelete(pokemon);
    setShowDeleteModal(true);
}}>
    Delete
</button>


    </div>
)}

{showDeleteModal && pokemonToDelete && (
  <div className={styles.modalOverlay}>
    <div className={styles.deleteModal}>
      <p>Are you sure you want to delete {pokemonToDelete.name}?</p>
      <button className={styles.modalButton} onClick={() => {
        // Assume the deletion is a GET request for simplicity; use DELETE in real applications
        window.location.href = `/delete-pokemon?name=${encodeURIComponent(pokemonToDelete.name)}`;
        setShowDeleteModal(false); // Close modal after initiating delete
      }}>Yes</button>
      <button className={styles.modalButton} onClick={() => setShowDeleteModal(false)}>No</button>
    </div>
  </div>
)}

      <div className={`${pokemon.types[0]} ${styles.pokemonCard}`} onClick={() => selectPokemon(pokemon)} style={{ backgroundImage: `url(${pokemon.types[0]}.png)` }}>
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
       {isLoggedIn && (
    <div style={{ display: 'flex', alignItems: 'center' }} className={`${pokemon.types[0]} ${styles.pokemonStatus}`}>
   <p>      {pokemonStatuses[pokemon._id.$oid]?.caught ? `You caught ${pokemon.name}` : pokemonStatuses[pokemon._id.$oid]?.seen ? `You have seen ${pokemon.name}` : `You haven't seen ${pokemon.name}`}</p>
   <div>
    <img 
      src={
        pokemonStatuses[pokemon._id.$oid]?.caught ? "./caught.png" :
        pokemonStatuses[pokemon._id.$oid]?.seen ? "./seen.png" :
        "./uncaught.png"
      } 
      alt={
        pokemonStatuses[pokemon._id.$oid]?.caught ? "Caught" :
        pokemonStatuses[pokemon._id.$oid]?.seen ? "Seen" :
        "Not Seen"
      }
      className={styles.statusIcon}
    />
     <button onClick={() => togglePokemonStatus(pokemon._id)}>
      {pokemonStatuses[pokemon._id.$oid]?.caught ? "Remove" : pokemonStatuses[pokemon._id.$oid]?.seen ? "Caught" : "Seen"}
    </button>
    </div>
    </div>
              )}
    </div>
  ))}
</div>


    </div>
  );
};

export default PokemonPage;


















