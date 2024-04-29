package fr.iut.ak.pkdxapi.models;

import java.util.List;

import org.springframework.data.annotation.Id;


public class PkmnData extends Pkmn {

    @Id
    private String id;

    public PkmnData(String id, String name, String description, String imgUrl, List<PkmnType> types, List<PkmnRegion> regions) {
        super(name, description, imgUrl, types, regions);
        this.id = id;
    }
    
    public String getId() {
        return id;
    }
}