package com.example.casaeficiente2.repositories;

import com.example.casaeficiente2.models.Immobile;
import com.example.casaeficiente2.models.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface ImmobileRepository extends JpaRepository<Immobile, Long> {

}
