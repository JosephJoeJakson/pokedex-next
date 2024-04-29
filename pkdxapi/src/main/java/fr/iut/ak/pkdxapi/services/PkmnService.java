package fr.iut.ak.pkdxapi.services;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import fr.iut.ak.pkdxapi.errors.PokemonAlreadyExistException;
import fr.iut.ak.pkdxapi.models.PkmnData;
import fr.iut.ak.pkdxapi.models.PkmnRegion;
import fr.iut.ak.pkdxapi.models.PkmnType;
import fr.iut.ak.pkdxapi.repositories.PkmnRepository;

// Service pour les pokémons
@Service
public class PkmnService {

    // Récupère le PokemonRepozitory
    @Autowired
    private PkmnRepository pkmnRepository;

    // Permet de lister tous les types de Pokémons
    public List < String > getAllPkmnTypes() {
        return Arrays.stream(PkmnType.values())
            .map(Enum::name)
            .collect(Collectors.toList());
    }

    // Permet de créer un pokémon et renvoie une erreu s'il existe déjà
    public PkmnData createPkmn(PkmnData pkmnData) {

        // Vérifie si le pokémon existe
        if (pkmnRepository.findByName(pkmnData.getPokemonName()).isPresent()) {
            throw new PokemonAlreadyExistException("Pokemon already exists", HttpStatus.CONFLICT);
        }
        return pkmnRepository.save(pkmnData);
    }

    public PkmnData addRegionToPokemon(String pkmnID, String regionName, int regionNumber) {
        PkmnData pkmnData = pkmnRepository.findById(pkmnID)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pokemon not found"));
    
        // Initialise la liste des régions si elle est null
        if (pkmnData.getPokemonRegions() == null) {
            pkmnData.setPokemonRegions(new ArrayList<>());
        }
    
        // Vérifie si la région est déjà présente sur le Pokémon
        boolean regionExists = pkmnData.getPokemonRegions().stream()
            .anyMatch(region -> region.getRegionName().equals(regionName) || region.getRegionNumber() == regionNumber);
    
        if (!regionExists) {
            // Ajoute la nouvelle région si elle n'est pas déjà présente
            PkmnRegion newRegion = new PkmnRegion(regionName, regionNumber);
            pkmnData.getPokemonRegions().add(newRegion);
        } else {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Region already exists for this Pokemon");
        }
    
        return pkmnRepository.save(pkmnData);
    }
    

    // Permet de rechercher des Pokémons à l'aide de différents paramètres
    public Map < String, Object > searchPokemons(String partialName, String typeOne, String typeTwo, int page, int size) {
        Pageable paging = PageRequest.of(page, size);

        Page < PkmnData > pagePkmns;
        // Si il y a une recherhe par le nom
        if (partialName != null) {
            pagePkmns = pkmnRepository.findByPartialName(partialName, paging);
        }
        // Si il y a une recherche par type 
        else if (typeOne != null || typeTwo != null) {
            pagePkmns = pkmnRepository.findByTypes(typeOne, typeTwo, paging);
        }
        // Sinon renovoie une liste avec un nombre minimum de Pokémon
        else {
            pagePkmns = pkmnRepository.findAll(paging);
        }

        List < PkmnData > pkmnList = pagePkmns.getContent();
        Map < String, Object > response = new HashMap < > ();
        response.put("data", pkmnList);
        response.put("count", pagePkmns.getTotalElements());

        return response;
    }

    public Optional < PkmnData > findPokemonById(String pkmnID) {
        return pkmnRepository.findById(pkmnID);
    }

    public Optional < PkmnData > findPokemonByName(String name) {
        return pkmnRepository.findByName(name);
    }

    public PkmnData getPokemon(String pkmnID, String name) {
        if (pkmnID != null) {
            return pkmnRepository.findById(pkmnID)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pokemon not found"));
        } else if (name != null) {
            return pkmnRepository.findByName(name)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pokemon not found"));
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Either 'id' or 'name' parameter must be provided");
        }
    }

    public void deletePokemonById(String pkmnID) {
        pkmnRepository.findById(pkmnID)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pokemon not found"));

        pkmnRepository.deleteById(pkmnID);
    }

    public PkmnData updatePokemon(String pkmnID, PkmnData updateDTO) {
        PkmnData pkmnData = pkmnRepository.findById(pkmnID)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pokemon not found"));

        // Mettez à jour seulement les champs fournis
        if (updateDTO.getPokemonName() != null) pkmnData.setName(updateDTO.getPokemonName());
        if (updateDTO.getPokemonDescription() != null) pkmnData.setDescription(updateDTO.getPokemonDescription());
        if (updateDTO.getPokemonImg() != null) pkmnData.setImgUrl(updateDTO.getPokemonImg());
        if (updateDTO.getPokemonTypes() != null) pkmnData.setTypes(updateDTO.getPokemonTypes());

        return pkmnRepository.save(pkmnData);
    }

    public PkmnData removeRegionFromPokemon(String pkmnID, String regionName) {
        PkmnData pokemon = pkmnRepository.findById(pkmnID)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pokemon not found"));

        boolean regionRemoved = pokemon.getPokemonRegions().removeIf(region -> region.getRegionName().equals(regionName));

        if (!regionRemoved) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Region not found in this Pokemon");
        }

        return pkmnRepository.save(pokemon);
    }
}