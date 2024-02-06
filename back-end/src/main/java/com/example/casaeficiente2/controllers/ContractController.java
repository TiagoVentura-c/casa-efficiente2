package com.example.casaeficiente2.controllers;

import com.example.casaeficiente2.models.Contract;
import com.example.casaeficiente2.models.Immobile;
import com.example.casaeficiente2.models.Photo;
import com.example.casaeficiente2.repositories.ContractRepository;
import com.example.casaeficiente2.repositories.ImmobileRepository;
import com.example.casaeficiente2.repositories.PhotoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/contract")
public class ContractController {
    @Autowired
    private ContractRepository repository;

    @GetMapping
    public ResponseEntity<List<Contract>> get() {
        List<Contract> contracts = repository.findAll();

        return ResponseEntity.ok().body(contracts);
    }

    @PostMapping
    public ResponseEntity<Contract> post(@RequestBody Contract contract){
        Contract newContract = repository.save(contract);

        return ResponseEntity.ok().body(newContract);
    }

    @PutMapping
    public ResponseEntity<Contract> update(@RequestBody Contract updatedContract){
        Optional<Contract> currentInfo = repository.findById(updatedContract.getId());

        if(currentInfo.isEmpty()){
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok().body(repository.save(updatedContract));
    }

    @DeleteMapping
    public ResponseEntity<String> delete(@RequestBody Contract contract){
        Optional<Contract> currentInfo = repository.findById(contract.getId());

        if(currentInfo.isEmpty()){
            return ResponseEntity.notFound().build();
        }

        repository.delete(contract);

        return ResponseEntity.ok().body("contracto removido com successo");
    }


}
