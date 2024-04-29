package fr.iut.ak.pkdxapi.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.iut.ak.pkdxapi.models.Pkmn;
import fr.iut.ak.pkdxapi.models.PkmnData;
import fr.iut.ak.pkdxapi.services.PkmnService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;




@RestController
public class PkmnController {

    private final PkmnService pkmnService;

    public PkmnController(PkmnService pkmnService) {
        this.pkmnService = pkmnService;
    }

    @GetMapping("/pkmn/types")
    public Map < String, Object > getPkmnTypes() {
        List < String > types = pkmnService.getAllPkmnTypes();
        Map < String, Object > response = new HashMap < > ();
        response.put("data", types);
        response.put("count", types.size());
        return response;
    }

    @PostMapping("/pkmn")
    public ResponseEntity <Pkmn> createPkmn(@RequestBody PkmnData pkmnData) {
        PkmnData createdPkmn = pkmnService.createPkmn(pkmnData);
        return ResponseEntity.ok(createdPkmn);
    }
    

    @PostMapping("/pkmn/region")
    public ResponseEntity<PkmnData> addRegionToPokemon(@RequestParam("pkmnID") String pkmnID,
                                                       @RequestParam("regionName") String regionName,
                                                       @RequestParam("regionNumber") int regionNumber) {
        PkmnData updatedPokemon = pkmnService.addRegionToPokemon(pkmnID, regionName, regionNumber);
        return ResponseEntity.ok(updatedPokemon);
    }


    @GetMapping("/pkmn/search")
    public ResponseEntity<Map<String, Object>> searchPokemons(
            @RequestParam(required = false) String partialName,
            @RequestParam(required = false) String typeOne,
            @RequestParam(required = false) String typeTwo,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        
        Map<String, Object> response = pkmnService.searchPokemons(partialName, typeOne, typeTwo, page, size);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/pkmn")
    public ResponseEntity<PkmnData> getPokemon(@RequestParam(required = false) String pkmnID, 
                                               @RequestParam(required = false) String pkmnName) {
        PkmnData pkmnData = pkmnService.getPokemon(pkmnID, pkmnName);
        return ResponseEntity.ok(pkmnData);
    }

    
    @DeleteMapping("/pkmn")
    @Secured("ROLE_ADMIN")
    public ResponseEntity<Void> deletePokemon(@RequestParam String pkmnID) {
        pkmnService.deletePokemonById(pkmnID);
        // Retourne un code 204 No Content
        return ResponseEntity.noContent().build(); 
    }

    @PutMapping("/pkmn")
    @Secured({"ROLE_ADMIN"})
    public ResponseEntity<PkmnData> updatePokemon(@RequestParam String pkmnID, @RequestBody PkmnData updateDTO) {
        PkmnData updatedPokemon = pkmnService.updatePokemon(pkmnID, updateDTO);
        return ResponseEntity.ok(updatedPokemon);
    }
    
    @DeleteMapping("/pkmn/region")
    @Secured({"ROLE_ADMIN"})
    public ResponseEntity<PkmnData> removeRegionFromPokemon(@RequestParam("pkmnID") String pkmnID, 
                                                             @RequestParam("regionName") String regionName) {
        PkmnData updatedPokemon = pkmnService.removeRegionFromPokemon(pkmnID, regionName);
        return ResponseEntity.ok(updatedPokemon);
    }
}
