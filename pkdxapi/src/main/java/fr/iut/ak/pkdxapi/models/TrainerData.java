package fr.iut.ak.pkdxapi.models;
import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class TrainerData extends Trainer {

    @Id
    private String id;

    // Constructeur
    public TrainerData(String id, String username, String imgUrl, String trainerName, Date creationDate, List<Pkmn> pkmnSeen, List<Pkmn> pkmnCatch) {
        super(username,imgUrl,trainerName,creationDate,pkmnSeen,pkmnCatch);
        this.id = id;
    }

    // Getter et Setter pour `id`
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
