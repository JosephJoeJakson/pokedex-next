package fr.iut.ak.pkdxapi.services;

import fr.iut.ak.pkdxapi.errors.UserAlreadyExistException;
import fr.iut.ak.pkdxapi.models.UserDTO;
import fr.iut.ak.pkdxapi.repositories.UserRepository;
import fr.iut.ak.pkdxapi.models.UserData;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

// Service pour les utilisateurs
@Service
public class UserDataService {

    // Récupère le UserRepository
    private final UserRepository userRepository;

    // Récupère le passwordEncoder pour encoder le mot de passe
    @Autowired
    private PasswordEncoder passwordEncoder;

    // Renvoie le userRepository
    public UserDataService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Vérifie si le nom d'utilisateur existe
    private boolean usernameExist(String login){
        return userRepository.findByLogin(login).isPresent();
    }

    // Enregistre un utilisateur et renvoie un message d'erreur si le nom d'utilisateur existe déjà
    public void registerUser(UserDTO userDTO) throws UserAlreadyExistException {
        if (usernameExist(userDTO.login())) {
            throw new UserAlreadyExistException("User already exists", HttpStatus.CONFLICT); // Ou HttpStatus.UNPROCESSABLE_ENTITY
        }
        
        UserData userData = new UserData(userDTO.login(), passwordEncoder.encode(userDTO.password()), false); 
        userRepository.save(userData);
    }
}