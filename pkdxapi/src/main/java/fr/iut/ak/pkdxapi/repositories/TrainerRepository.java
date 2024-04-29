package fr.iut.ak.pkdxapi.repositories;

import java.util.Optional;
import fr.iut.ak.pkdxapi.models.TrainerData;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TrainerRepository extends MongoRepository<TrainerData, String> {
    Optional<TrainerData> findByUsername(String username);
}