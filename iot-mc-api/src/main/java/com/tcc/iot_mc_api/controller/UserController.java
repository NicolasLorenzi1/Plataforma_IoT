package com.tcc.iot_mc_api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tcc.iot_mc_api.dto.AuthDTO;
import com.tcc.iot_mc_api.dto.LoginDTO;
import com.tcc.iot_mc_api.dto.RegisterDTO;
import com.tcc.iot_mc_api.infra.security.TokenService;
import com.tcc.iot_mc_api.model.user.User;
import com.tcc.iot_mc_api.repository.UserRepository;
import com.tcc.iot_mc_api.service.UserService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;



@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserRepository repository;
    @Autowired
    private TokenService tokenService;
    @Autowired
    private UserService service;
    
    @PostMapping("/login")
    public ResponseEntity<LoginDTO> login(@RequestBody AuthDTO data) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.senha());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        String token = tokenService.generateToken((User) auth.getPrincipal());

        return ResponseEntity.ok(new LoginDTO(token));
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<LoginDTO> cadastrar(@RequestBody RegisterDTO data) {
        if (this.repository.findByEmail(data.email()) != null) return ResponseEntity.badRequest().build();

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.senha());
        User newUser = new User(data.email(), encryptedPassword);

        this.repository.save(newUser);

        return ResponseEntity.ok().build();
    }

    @GetMapping("listar/todos")
    public List<User> listarTodos() {
        return service.listarTodos();
    }

    @GetMapping("listar/{id}")
    public User listar(@PathVariable Long id) {
        return service.listarUser(id);
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<String> deletarUser(@PathVariable Long id){
        service.excluirUser(id);
        return ResponseEntity.ok("Usuario deletado com sucesso!");
    }

    @PutMapping("atualizar/{id}")
    public ResponseEntity<String> atualizarUser(@PathVariable Long id, @RequestBody User user) {
        service.atualizarUser(id, user);
        return ResponseEntity.ok("Usuario atualizado com sucesso!");
    }
    
}
        