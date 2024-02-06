package com.example.casaeficiente2.repositories;

import com.example.casaeficiente2.models.Contract;
import com.example.casaeficiente2.models.Immobile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface ContractRepository extends JpaRepository<Contract, Long> {

}
