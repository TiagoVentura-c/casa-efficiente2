package com.example.casaeficiente2.dto;

import com.example.casaeficiente2.models.enums.UserType;

public record RegisterDTO(String user, String password, UserType type, String firstName, String lastName, String nationalId, String email) {
}
