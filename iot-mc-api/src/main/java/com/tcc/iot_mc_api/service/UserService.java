package com.tcc.iot_mc_api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tcc.iot_mc_api.model.user.User;
import com.tcc.iot_mc_api.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    public void excluirUser(Long id) {
        repository.deleteById(id);
    }

    public void atualizarUser(Long id, User userAtualizado) {
        User user = repository.findById(id).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        user.setDispositivos(userAtualizado.getDispositivos());
        user.setEmail(userAtualizado.getEmail());
        user.setPassword(userAtualizado.getPassword());
        user.setRole(userAtualizado.getRole());

        repository.save(user);
    }

    public User listarUser(Long id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }

    public List<User> listarTodos() {
        return repository.findAll();
    }

}
