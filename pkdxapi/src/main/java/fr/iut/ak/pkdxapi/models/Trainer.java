package fr.iut.ak.pkdxapi.models;

import java.util.Date;
import java.util.List;

public class Trainer {
    private String username;
    private String imgUrl;
    private String trainerName;
    private Date creationDate;
    private List<Pkmn> pkmnSeen;
    private List<Pkmn> pkmnCatch;

    // Constructeur vide
    public Trainer() {}

    // Constructeur avec paramètres
    public Trainer(String username, String imgUrl, String trainerName, Date creationDate, List<Pkmn> pkmnSeen, List<Pkmn> pkmnCatch) {
        this.username = username;
        this.imgUrl = imgUrl;
        this.trainerName = trainerName;
        this.creationDate = creationDate;
        this.pkmnSeen = pkmnSeen;
        this.pkmnCatch = pkmnCatch;
    }

    // Getters
    public String getUsername() {
        return username;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public String getTrainerName() {
        return trainerName;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public List<Pkmn> getPkmnSeen() {
        return pkmnSeen;
    }

    public List<Pkmn> getPkmnCatch() {
        return pkmnCatch;
    }

    // Setters
    public void setUsername(String username) {
        this.username = username;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public void setTrainerName(String trainerName) {
        this.trainerName = trainerName;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public void setPkmnSeen(List<Pkmn> pkmnSeen) {
        this.pkmnSeen = pkmnSeen;
    }

    public void setPkmnCatch(List<Pkmn> pkmnCatch) {
        this.pkmnCatch = pkmnCatch;
    }
}
