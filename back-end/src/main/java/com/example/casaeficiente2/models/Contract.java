package com.example.casaeficiente2.models;

import com.example.casaeficiente2.models.enums.StatusContract;
import com.example.casaeficiente2.models.enums.TypePropertyBusiness;
import com.example.casaeficiente2.models.enums.UserType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Table(name = "contract")
@Entity
public class Contract {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private TypePropertyBusiness typePropertyBusiness;

    @ManyToOne
    @JoinColumn(name = "client_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Person client;

    @ManyToOne
    @JoinColumn(name = "broker_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Person broker;
    
    @OneToOne
    @JoinColumn(name = "immobile_id", referencedColumnName = "id")
    private Immobile immobile;

    private Date startDate;

    @Column(nullable = true)
    private Date endDate;

    private float totalPaid;

    @Column(nullable = true)
    private Long contractTimeInDays;

    private StatusContract statusContract;

    @Column(nullable = true)
    private String clientDescription;

    public Contract() {
    }

    public Contract(Long id, TypePropertyBusiness typePropertyBusiness, Person client, Person broker, Immobile immobile, Date startDate, Date endDate, float totalPaid, Long contractTimeInDays, StatusContract statusContract, String clientDescription) {
        this.id = id;
        this.typePropertyBusiness = typePropertyBusiness;
        this.client = client;
        this.broker = broker;
        this.immobile = immobile;
        this.startDate = startDate;
        this.endDate = endDate;
        this.totalPaid = totalPaid;
        this.contractTimeInDays = contractTimeInDays;
        this.statusContract = statusContract;
        this.clientDescription = clientDescription;
    }
}
