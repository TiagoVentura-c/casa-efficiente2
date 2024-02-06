package com.example.casaeficiente2.models;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

@Embeddable
@Getter
@Setter
public class Location {
    private String country;
    private String province;
    private String address;
    private String lat;
    private String lon;
    private boolean isBuilding;

    public Location(String country, String province, String address, String lat, String lon, boolean isBuilding) {
        this.country = country;
        this.province = province;
        this.address = address;
        this.lat = lat;
        this.lon = lon;
        this.isBuilding = isBuilding;
    }

    public Location() {

    }
}
