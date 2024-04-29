package fr.iut.ak.pkdxapi.services;


import java.util.ArrayList;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import fr.iut.ak.pkdxapi.models.TrainerData;
import fr.iut.ak.pkdxapi.repositories.TrainerRepository;

@Service
public class TrainerService {

    @Autowired
    private TrainerRepository trainerRepository;
   
    public TrainerData createTrainer(TrainerData trainerData, String username) {
        // Vérifie si un Trainer existe déjà pour cet utilisateur
        if (trainerRepository.findByUsername(username).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Trainer already exists");
        }
        
       
        trainerData.setUsername(username);

        trainerData.setImgUrl("https://www.pokepedia.fr/images/thumb/e/e3/M%C3%A9tamorph-RFVF.png/640px-M%C3%A9tamorph-RFVF.png");
        trainerData.setTrainerName(trainerData.getTrainerName()); 
        trainerData.setCreationDate(new Date());

   
        trainerData.setPkmnSeen(new ArrayList<>()); 
        trainerData.setPkmnCatch(new ArrayList<>()); 

        return trainerRepository.save(trainerData);
    }

    public TrainerData getTrainer(String username) {
    return trainerRepository.findByUsername(username)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Trainer not found"));
    }

    public TrainerData updateTrainer(String username, TrainerData updatedTrainerData) {
        TrainerData existingTrainer = trainerRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Trainer not found"));
    
        if (updatedTrainerData.getImgUrl() != null) existingTrainer.setImgUrl(updatedTrainerData.getImgUrl());
        if (updatedTrainerData.getTrainerName() != null) existingTrainer.setTrainerName(updatedTrainerData.getTrainerName());
   
    
        return trainerRepository.save(existingTrainer);
    }
    
    public void deleteTrainer(String username) {
        TrainerData existingTrainer = trainerRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Trainer not found"));
        
        trainerRepository.delete(existingTrainer);
    }    

}