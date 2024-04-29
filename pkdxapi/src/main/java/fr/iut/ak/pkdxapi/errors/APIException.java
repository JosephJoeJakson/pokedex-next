package fr.iut.ak.pkdxapi.errors;

import org.springframework.http.HttpStatus;


public abstract class APIException extends RuntimeException{
    private final HttpStatus status;
    
  
    public HttpStatus getStatus() {
        return status;
    }

  
    public APIException(HttpStatus status, String message){
        super(message);
        this.status = status;
    }
   
    public APIException(HttpStatus status){
        this.status = status;
    }
}
