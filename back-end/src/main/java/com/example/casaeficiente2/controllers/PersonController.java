package com.example.casaeficiente2.controllers;

import com.example.casaeficiente2.models.Person;
import com.example.casaeficiente2.repositories.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/person")
public class PersonController {
    @Autowired
    private PersonRepository repository;

    @GetMapping
    public ResponseEntity<List<Person>> get() {
        List<Person> persons = repository.findAll();

        return ResponseEntity.ok().body(persons);
    }

    @PostMapping
    public ResponseEntity<Person> post(@RequestBody Person person){
        if(this.repository.findByUser(person.getUser()) != null) return ResponseEntity.badRequest().build();
        System.out.println(person.getPassword());
        System.out.println("---------");

        String encryptedPassword = new BCryptPasswordEncoder().encode(person.getPassword());
        person.setPassword(encryptedPassword);

        Person newPerson = repository.save(person);

        return ResponseEntity.ok().body(newPerson);
    }

    @PutMapping
    public ResponseEntity<Person> update(@RequestBody Person updatedPerson){
        Optional<Person> currentInfoPerson = repository.findById(updatedPerson.getId());

        if(currentInfoPerson.isEmpty()){
            return ResponseEntity.notFound().build();
        }

//        BeanUtils.copyProperties(updatedPerson, currentInfoPerson, "id", "password");

        updatedPerson.setPassword(currentInfoPerson.get().getPassword());
        return ResponseEntity.ok().body(repository.save(updatedPerson));
    }

    @DeleteMapping
    public ResponseEntity<String> delete(@RequestBody Person updatedPerson){
        Optional<Person> currentInfoPerson = repository.findById(updatedPerson.getId());

        if(currentInfoPerson.isEmpty()){
            return ResponseEntity.notFound().build();
        }
        repository.delete(updatedPerson);

        return ResponseEntity.ok().body("Usuario removido com successo");
    }
}
