package fr.iut.ak.pkdxapi.models;

public class PkmnRegion {
    private int regionNumber;
    private String regionName;

 
    public PkmnRegion(String regionName, int regionNumber) {
        this.regionName = regionName;
        this.regionNumber = regionNumber;
    }
    
    public int getRegionNumber() {
        return regionNumber;
    }

    public String getRegionName() {
        return regionName;
    }
}
