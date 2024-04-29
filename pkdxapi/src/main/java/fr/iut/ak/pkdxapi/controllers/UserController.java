package fr.iut.ak.pkdxapi.controllers;

import fr.iut.ak.pkdxapi.models.UserDTO;
import fr.iut.ak.pkdxapi.services.UserDataService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    private final UserDataService userDataService;

    public UserController(UserDataService userDataService) {
        this.userDataService = userDataService;
    }

    @PostMapping("/users/register")
    public ResponseEntity<String> registerUser(@RequestBody UserDTO userDTO) {
        userDataService.registerUser(userDTO);
        return ResponseEntity.ok("User registered successfully");
    }

    @GetMapping("/users/test")
    public String helloWorld(){
        return "Hello, admin !";
    }

    @GetMapping("/users/login")
    public String loginUser(){
        return "Hello, you are logged IN !";
    }
}


