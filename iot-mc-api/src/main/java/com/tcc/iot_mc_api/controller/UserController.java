package com.tcc.iot_mc_api.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.tcc.iot_mc_api.dto.AuthDTO;
import com.tcc.iot_mc_api.dto.LoginDTO;
import com.tcc.iot_mc_api.dto.RegisterDTO;
import com.tcc.iot_mc_api.infra.security.TokenService;
import com.tcc.iot_mc_api.model.user.User;
import com.tcc.iot_mc_api.repository.UserRepository;
import com.tcc.iot_mc_api.service.UserService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/user")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

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
        logger.info("Tentativa de login para usuário: {}", data.email());

        try {
            var usernamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.senha());
            var auth = this.authenticationManager.authenticate(usernamePassword);

            String token = tokenService.generateToken((User) auth.getPrincipal());
            logger.info("Login bem-sucedido para usuário: {}", data.email());

            return ResponseEntity.ok(new LoginDTO(token));
        } catch (Exception e) {
            logger.error("Falha no login para usuário {}: {}", data.email(), e.getMessage());
            return ResponseEntity.status(401).build();
        }
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<LoginDTO> cadastrar(@RequestBody RegisterDTO data) {
        logger.info("Tentativa de cadastro para email: {}", data.email());

        if (this.repository.findByEmail(data.email()) != null) {
            logger.warn("Cadastro falhou: usuário {} já existe", data.email());
            return ResponseEntity.badRequest().build();
        }

        try {
            String encryptedPassword = new BCryptPasswordEncoder().encode(data.senha());
            User newUser = new User(data.email(), encryptedPassword);
            this.repository.save(newUser);

            logger.info("Usuário cadastrado com sucesso: {}", data.email());
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            logger.error("Erro ao cadastrar usuário {}: {}", data.email(), e.getMessage(), e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("listar/todos")
    public List<User> listarTodos() {
        logger.info("Listando todos os usuários");
        return service.listarTodos();
    }

    @GetMapping("listar/{id}")
    public User listar(@PathVariable Long id) {
        logger.info("Buscando usuário com ID {}", id);
        return service.listarUser(id);
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<String> deletarUser(@PathVariable Long id){
        logger.info("Solicitação para deletar usuário com ID {}", id);

        try {
            service.excluirUser(id);
            logger.info("Usuário com ID {} deletado com sucesso", id);
            return ResponseEntity.ok("Usuário deletado com sucesso!");
        } catch (Exception e) {
            logger.error("Erro ao deletar usuário com ID {}: {}", id, e.getMessage(), e);
            return ResponseEntity.internalServerError().body("Erro ao deletar usuário");
        }
    }

    @PutMapping("atualizar/{id}")
    public ResponseEntity<String> atualizarUser(@PathVariable Long id, @RequestBody User user) {
        logger.info("Solicitação para atualizar usuário com ID {}", id);

        try {
            service.atualizarUser(id, user);
            logger.info("Usuário com ID {} atualizado com sucesso", id);
            return ResponseEntity.ok("Usuário atualizado com sucesso!");
        } catch (Exception e) {
            logger.error("Erro ao atualizar usuário com ID {}: {}", id, e.getMessage(), e);
            return ResponseEntity.internalServerError().body("Erro ao atualizar usuário");
        }
    }
}
