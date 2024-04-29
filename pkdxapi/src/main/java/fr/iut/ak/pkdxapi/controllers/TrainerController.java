package fr.iut.ak.pkdxapi.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import fr.iut.ak.pkdxapi.models.TrainerData;
import fr.iut.ak.pkdxapi.services.TrainerService;


@RestController
public class TrainerController {


    @Autowired
    private TrainerService trainerService;
    
    
    @PostMapping("/trainer")
    public ResponseEntity<TrainerData> createTrainer(@RequestBody TrainerData trainerData) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return ResponseEntity.ok(trainerService.createTrainer(trainerData, username));
    }

    @GetMapping("/trainer")
    public ResponseEntity<TrainerData> getMyTrainerInfo() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName(); 

        TrainerData trainer = trainerService.getTrainer(username); 

        return ResponseEntity.ok(trainer); 
    }

    @PutMapping("/trainer")
    public ResponseEntity<TrainerData> updateTrainer(@RequestBody TrainerData trainerData) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        TrainerData updatedTrainer = trainerService.updateTrainer(username, trainerData);
        return ResponseEntity.ok(updatedTrainer);
    }

    @DeleteMapping("/trainer")
    public ResponseEntity<Void> deleteTrainer() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        trainerService.deleteTrainer(username);
        return ResponseEntity.noContent().build();
    }

}
