package fr.iut.ak.pkdxapi.models;

import java.util.List;

public class Pkmn {
    private String name;
    private String description;
    private String imgUrl;
    private List<PkmnType> types;
    private List<PkmnRegion> regions;

    public Pkmn(String name, String description, String imgUrl, List<PkmnType> types, List<PkmnRegion> regions) {
        this.name = name;
        this.description = description;
        this.imgUrl = imgUrl;
        this.types = types;
        this.regions = regions;
    }
    
    public String getPokemonImg(){
        return imgUrl;
    }

    public String getPokemonDescription(){
        return description;
    }

    public String getPokemonName(){
        return name;
    }
    
    public List<PkmnType> getPokemonTypes() {
        return types;
    }

    public void setPokemonRegions(List<PkmnRegion> regions) {
        this.regions = regions;
    }
    
    public List<PkmnRegion> getPokemonRegions() {
        return regions;
    }
    public void setName(String name) {
        this.name = name;
    }

 
    public void setDescription(String description) {
        this.description = description;
    }
  
    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public void setTypes(List<PkmnType> types) {
        this.types = types;
    }

}
