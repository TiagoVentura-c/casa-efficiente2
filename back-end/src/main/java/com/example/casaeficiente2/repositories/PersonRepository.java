package com.example.casaeficiente2.repositories;

import com.example.casaeficiente2.models.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {
    UserDetails findByUser(String login);
    Person findByUserOrId(String login, Long id);

}
