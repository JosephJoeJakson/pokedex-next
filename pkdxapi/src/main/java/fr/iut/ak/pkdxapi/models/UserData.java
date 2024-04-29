package fr.iut.ak.pkdxapi.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

// Class UserData
@Document("User")
@TypeAlias("UserData")
public class UserData {
    
    @Id
    private String login;
    private String password;
    private boolean admin;

    // Défini le USerData avec un Login, un Password et un booléen pour savoir si il est admin
    public UserData(){
        this("user","",false);
    }
    
    public UserData(String login, String password, boolean isAdmin){
        this.login = login;
        this.password = password;
        this.admin = isAdmin;        
    }

    public boolean isAdmin(){
        return this.admin;
    }
    
    public String getLogin(){
        return login;
    }

    public String getPassword(){
        return password;
    }
}


