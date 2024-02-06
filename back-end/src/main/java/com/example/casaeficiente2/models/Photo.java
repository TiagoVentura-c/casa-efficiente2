package com.example.casaeficiente2.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
@Entity
@Table(name = "photo")
public class Photo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String url;

    @ManyToOne
    @JoinColumn(name = "immobile_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Immobile immobile;

    public Photo() {
    }

    public Photo(Long id, String url, Immobile immobile) {
        this.id = id;
        this.url = url;
        this.immobile = immobile;
    }
}
