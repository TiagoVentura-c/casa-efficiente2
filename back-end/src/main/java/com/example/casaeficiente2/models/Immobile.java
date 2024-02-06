package com.example.casaeficiente2.models;

import com.example.casaeficiente2.models.enums.TypeProperty;
import com.example.casaeficiente2.models.enums.TypePropertyBusiness;
import com.example.casaeficiente2.models.enums.UserType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Data
@Table(name = "immobile")
@Entity
public class Immobile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private TypeProperty type;

    private String name;
    @Column
    private Boolean isAvailable;
    private float price;
    private TypePropertyBusiness typePropertyBusiness;
    private String description;

    @Embedded
    private Dimention dimention;

    @Embedded
    private Location location;

    private float ratingAverage;

    @OneToMany(mappedBy = "immobile", fetch = FetchType.EAGER)
    private List<Photo> photos = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "broker_id")
    private Person broker;

    public Immobile() {
    }

    public Immobile(Long id, TypeProperty type, String name, Boolean isAvailable, float price, TypePropertyBusiness typePropertyBusiness, String description, Dimention dimention, Location location, float ratingAverage, List<Photo> photos) {
        this.id = id;
        this.type = type;
        this.name = name;
        this.isAvailable = isAvailable;
        this.price = price;
        this.typePropertyBusiness = typePropertyBusiness;
        this.description = description;
        this.dimention = dimention;
        this.location = location;
        this.ratingAverage = ratingAverage;
        this.photos = photos;
    }
}
