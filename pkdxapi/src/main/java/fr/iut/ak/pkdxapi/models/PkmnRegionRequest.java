package fr.iut.ak.pkdxapi.models;

public class PkmnRegionRequest {
    private String pkmnName;
    private PkmnRegion pkmnRegion;

    // Getters et Setters
    public String getPkmnName() {
        return pkmnName;
    }

    public void setPkmnName(String pkmnName) {
        this.pkmnName = pkmnName;
    }

    public PkmnRegion getPkmnRegion() {
        return pkmnRegion;
    }

    public void setPkmnRegion(PkmnRegion pkmnRegion) {
        this.pkmnRegion = pkmnRegion;
    }
}
