package fr.iut.ak.pkdxapi.models;

// Class UserDTO pour mettre le Password et Login
public class UserDTO {
    private String login;
    private String password;

    // Récupère le login
    public String login() {
        return login;
    }

    // Met le Login
    public void setLogin(String login) {
        this.login = login;
    }
    
    // Récupère le Password
    public String password() {
        return password;
    }

    // Met le Password
    public void setPassword(String password) {
        this.password = password;
    }
}
