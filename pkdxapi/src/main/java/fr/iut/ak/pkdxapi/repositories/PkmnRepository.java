package fr.iut.ak.pkdxapi.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import fr.iut.ak.pkdxapi.models.PkmnData;
import java.util.Optional;


// Repository pour les Pokémons
@Repository
public interface PkmnRepository extends MongoRepository<PkmnData,String>{

   // Query pour trouver le pokémon par son nom
   @Query("{ 'name' : ?0 }")
   Optional<PkmnData> findByName(String name);

   // Query pour trouver le pokémon à l'aide du partialName
   @Query(value = "{'name': {$regex: ?0, $options: 'i'}}")
   Page<PkmnData> findByPartialName(String partialName, Pageable paging);

   // Query pour trouver le pokémon par son type
   @Query(value = "{$or: [{'types': ?0}, {'types': ?1}]}")
   Page<PkmnData> findByTypes(String typeOne, String typeTwo, Pageable paging);

}