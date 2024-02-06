package com.example.casaeficiente2.models;

import com.example.casaeficiente2.models.enums.UserType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Getter
@Setter
@Table(name = "person")
@Entity
@AllArgsConstructor
public class Person implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;

    @Column(nullable = true)
    private String address;

    @Column(unique = true)
    private String nationalId;

    @Enumerated(EnumType.STRING)
    private UserType type;

    private String email;

    @Column(name = "userName", unique = true)
    private String user;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;


    @OneToMany(mappedBy = "client", fetch = FetchType.EAGER)
    @Column(nullable = true)
    private List<Contract> clientContracts = new ArrayList<>();


    @OneToMany(mappedBy = "broker", fetch = FetchType.EAGER)
    @Column(nullable = true)
    private List<Contract> brokerContracts = new ArrayList<>();

    @OneToMany(mappedBy = "broker", fetch = FetchType.EAGER)
    @Column(nullable = true)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private List<Immobile> immobiles = new ArrayList<>();

    public Person(String firstName, String lastName, String nationalId, UserType type, String email, String user, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.nationalId = nationalId;
        this.type = type;
        this.email = email;
        this.user = user;
        this.password = password;
    }

    public Person() {}

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if(this.type == UserType.ADMIN) return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"), new SimpleGrantedAuthority("ROLE_USER"),  new SimpleGrantedAuthority("ROLE_BROKER"));
        else if (this.type == UserType.BROKER) return List.of(new SimpleGrantedAuthority("ROLE_BROKER"));
        else return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getUsername() {
        return user;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }




}
