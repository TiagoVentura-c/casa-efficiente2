package com.example.casaeficiente2.controllers;

import com.example.casaeficiente2.models.Immobile;
import com.example.casaeficiente2.models.Person;
import com.example.casaeficiente2.models.Photo;
import com.example.casaeficiente2.repositories.ImmobileRepository;
import com.example.casaeficiente2.repositories.PersonRepository;
import com.example.casaeficiente2.repositories.PhotoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/immobile")
public class ImmobileController {
    @Autowired
    private ImmobileRepository repository;

    @Autowired
    private PhotoRepository photoRepository;

    @GetMapping
    public ResponseEntity<List<Immobile>> get() {
        List<Immobile> immobiles = repository.findAll();

        return ResponseEntity.ok().body(immobiles);
    }

    @PostMapping
    public ResponseEntity<Immobile> post(@RequestBody Immobile immobile){
        Immobile newImmobile = repository.save(immobile);

        return ResponseEntity.ok().body(newImmobile);
    }

    @PutMapping
    public ResponseEntity<Immobile> update(@RequestBody Immobile updatedImmbile){
        Optional<Immobile> currentInfo = repository.findById(updatedImmbile.getId());

        if(currentInfo.isEmpty()){
            return ResponseEntity.notFound().build();
        }

//        BeanUtils.copyProperties(updatedPerson, currentInfoPerson, "id", "password");

        return ResponseEntity.ok().body(repository.save(updatedImmbile));
    }

    @DeleteMapping
    public ResponseEntity<String> delete(@RequestBody Immobile immobile){
        Optional<Immobile> currentInfo = repository.findById(immobile.getId());

        if(currentInfo.isEmpty()){
            return ResponseEntity.notFound().build();
        }

        repository.delete(immobile);

        return ResponseEntity.ok().body("Imovel removido com successo");
    }

    @PostMapping(value = "/photos")
    public ResponseEntity<Photo> postPhoto(@RequestBody Photo photo){

        Photo newPhoto = photoRepository.save(photo);
        return ResponseEntity.ok().body(newPhoto);
    }

    @DeleteMapping(value = "/photos")
    public ResponseEntity<String> deletePhoto(@RequestBody Photo photo){
        Optional<Photo> currentInfo = photoRepository.findById(photo.getId());

        if(currentInfo.isEmpty()){
            return ResponseEntity.notFound().build();
        }

        photoRepository.delete(photo);

        return ResponseEntity.ok().body("Photo removido com successo");
    }

}
