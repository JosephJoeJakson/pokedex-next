package fr.iut.ak.pkdxapi.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import fr.iut.ak.pkdxapi.models.UserData;
import java.util.Optional;


// Repository pour les utilisateurs
@Repository
public interface UserRepository extends MongoRepository<UserData,String>{

   // Query pour vérifier si l'utilisateur existe déjà
   @Query("{ '_id' : ?0 }")
   Optional<UserData> findByLogin(String _id);

}