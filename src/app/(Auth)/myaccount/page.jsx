"use client";
import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import DeleteConfirmationModal from './DeleteConfirmationModal';


const MyAccountPage = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [trainerInfo, setTrainerInfo] = useState(null);
  const [pokemonsSeen, setPokemonsSeen] = useState([]);
  const [pokemonsCaught, setPokemonsCaught] = useState([]);
  const [showDeleteProfileModal, setShowDeleteProfileModal] = useState(false);
  const [showDeleteTrainerModal, setShowDeleteTrainerModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);


  useEffect(() => {
    fetchTrainerInfo();
  }, []); 

  useEffect(() => {
    // Function to fetch the current user from local storage
    const loadCurrentUser = () => {
        const storedUser = JSON.parse(localStorage.getItem('currentUser')) || {};
        setCurrentUser(storedUser);
    };

    loadCurrentUser(); // Call the function when the component mounts

    // Optional: Setup an event listener for changes in local storage if the user data might be updated in other tabs
    const handleStorageChange = (event) => {
        if (event.key === 'currentUser') {
            loadCurrentUser();
        }
    };

    window.addEventListener('storage', handleStorageChange);

    // Cleanup the event listener when the component unmounts
    return () => {
        window.removeEventListener('storage', handleStorageChange);
    };
}, [])

  const fetchTrainerInfo = async () => {
    if (!currentUser || !currentUser._id) {
      console.log("No user logged in");
      return; 
    }

    try {
      setIsAdmin(currentUser.admin);
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
    localStorage.removeItem('currentUser');
    window.location.href = '/login'; 
  };


  const deleteProfile = async () => {
  try {
    const response = await fetch('/api/user/delete', { method: 'DELETE' });

 
  } catch (error) {
    console.error('Error deleting profile:', error);

  }
  setShowDeleteProfileModal(false);  
};

const deleteTrainer = async () => {
  try {
    const response = await fetch('/api/trainer/delete', { method: 'DELETE' });



  } catch (error) {
    console.error('Error deleting trainer:', error);

  }
  setShowDeleteTrainerModal(false);  
};

  return (
      <div className={styles.container}>
              <h2>Welcome back {currentUser._id}</h2>
        <div className={styles.userInfo}>
        <a className={styles.modifyButton} href="./edit-trainer">Modify account</a>
        <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
        <button onClick={() => setShowDeleteProfileModal(true)}  className={styles.deleteUserButton}>Delete Profile</button>
        <button onClick={() => setShowDeleteTrainerModal(true)} className={styles.deleteTrainerButton}>Delete Trainer</button>
        </div>

        {isAdmin && (
    <div className={styles.adminTools}>
      <h2>Admin tools</h2>
     <a className={styles.addPokemon} href={`./add-pokemon`}>Create a new pokemon</a>


    </div>
)}

        <h2>Your Trainer</h2>
        {trainerInfo ? (
          <>

            <div className={styles.trainerInfo}>
                <img src={trainerInfo.imgUrl} alt="Trainer" />
                <p>{trainerInfo.trainerName}</p>
            </div>
            <div className={styles.pokemonCount}>
            <div className={styles.pokemonSeen}>
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
    </div>
    <div className={styles.pokemonCaught}>
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
          </>
        ) : (
          <div>
            <p className={styles.noTrainer}><img className={styles.emptyIcon} src="./emptyIcon.png" alt="Empty Icon"/>No trainer profile found. Create one <a className={styles.createTrainer} href="./create-trainer">here</a></p>
          </div>
        )}
    
       
    
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
