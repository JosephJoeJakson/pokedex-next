package fr.iut.ak.pkdxapi.errors;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class PokemonAlreadyExistException extends ResponseStatusException {
    
    public PokemonAlreadyExistException(String reason, HttpStatus status) {
        super(status, reason);
    }
}
