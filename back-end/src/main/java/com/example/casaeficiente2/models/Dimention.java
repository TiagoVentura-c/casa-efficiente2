package com.example.casaeficiente2.models;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

@Embeddable
@Getter
@Setter
public class Dimention {
    private float height;
    private float width;
    private float length;

    public Dimention(float height, float width, float length) {
        this.height = height;
        this.width = width;
        this.length = length;
    }

    public Dimention() {

    }
}
