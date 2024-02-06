package com.example.casaeficiente2.dto;

import com.example.casaeficiente2.models.Person;
import com.example.casaeficiente2.models.enums.UserType;

public record LoginResponseDTO(String token, UserType type, Person person) {
}
