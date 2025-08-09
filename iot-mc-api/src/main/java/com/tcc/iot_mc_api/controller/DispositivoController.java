package com.tcc.iot_mc_api.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tcc.iot_mc_api.dto.DispositivoDTO;
import com.tcc.iot_mc_api.model.device.Dispositivo;
import com.tcc.iot_mc_api.model.user.User;
import com.tcc.iot_mc_api.service.DispositivoService;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/dispositivo")
public class DispositivoController {

    private final DispositivoService service;

    public DispositivoController(DispositivoService service) {
        this.service = service;
    }

    @PostMapping("registrarDispositivo")
    public ResponseEntity<String> registrarDispositivo(@RequestBody DispositivoDTO data) {
        String tokenGerado = service.registrarDispositivo(data);             
        return ResponseEntity.ok("Dispositivo salvo\nToken:" + tokenGerado);
    }

    @GetMapping("listar/todos")
    public List<Dispositivo> listarTodos() {
        return service.listarTodos();
    }

    @GetMapping("listar/{id}")
    public Dispositivo listar(@PathVariable Long id) {
        return service.listarDispositivo(id);
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<String> deletarDispositivo(@PathVariable Long id){
        service.excluirDispositivo(id);
        return ResponseEntity.ok("Dispositivo deletado com sucesso!");
    }

    @PutMapping("atualizar/{id}")
    public ResponseEntity<String> atualizarDispositivo(@PathVariable Long id, @RequestBody Dispositivo dispositivo) {
        service.atualizarDispositivo(id, dispositivo);
        return ResponseEntity.ok("Dispositivo atualizado com sucesso!");
    }
    
}
