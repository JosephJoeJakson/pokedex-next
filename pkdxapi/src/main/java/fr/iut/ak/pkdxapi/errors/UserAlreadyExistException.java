package fr.iut.ak.pkdxapi.errors;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class UserAlreadyExistException extends ResponseStatusException {

    public UserAlreadyExistException(String reason, HttpStatus status) {
        super(status, reason);
    }
}
