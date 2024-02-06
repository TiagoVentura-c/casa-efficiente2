package com.example.casaeficiente2.controllers;

import com.example.casaeficiente2.dto.AuthenticationDTO;
import com.example.casaeficiente2.dto.LoginResponseDTO;
import com.example.casaeficiente2.dto.RegisterDTO;
import com.example.casaeficiente2.models.Person;
import com.example.casaeficiente2.repositories.PersonRepository;
import com.example.casaeficiente2.security.TokenService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("auth")
public class AuthenticationController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private PersonRepository repository;
    @Autowired
    private TokenService tokenService;


    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AuthenticationDTO data){
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.user(), data.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((Person) auth.getPrincipal());
        var person = repository.findByUserOrId(data.user(), 0L);

        return ResponseEntity.ok(new LoginResponseDTO(token, person.getType(), person));
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid RegisterDTO data){
        if(this.repository.findByUser(data.user()) != null) return ResponseEntity.badRequest().build();

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());

        Person newUser = new Person(data.firstName(), data.lastName(), data.nationalId(),data.type(), data.email(), data.user(),encryptedPassword);

        this.repository.save(newUser);
        return ResponseEntity.ok().build();
    }
}
