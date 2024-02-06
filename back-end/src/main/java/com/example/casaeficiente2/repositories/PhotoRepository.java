package com.example.casaeficiente2.repositories;

import com.example.casaeficiente2.models.Person;
import com.example.casaeficiente2.models.Photo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PhotoRepository extends JpaRepository<Photo, Long> {
}
