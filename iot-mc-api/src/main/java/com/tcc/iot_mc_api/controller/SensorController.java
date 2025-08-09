package com.tcc.iot_mc_api.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tcc.iot_mc_api.dto.SensorDTO;
import com.tcc.iot_mc_api.model.device.Dispositivo;
import com.tcc.iot_mc_api.model.device.Sensor;
import com.tcc.iot_mc_api.service.SensorService;

@RestController
@RequestMapping("/api/sensor")
public class SensorController {

    private final SensorService service;

    public SensorController(SensorService service) {
        this.service = service;
    }

    @PostMapping("registrarSensor")
    public ResponseEntity<String> registrarSensor(@RequestBody SensorDTO data) {
        service.registrarSensor(data);             
        return ResponseEntity.ok("Sensor salvo");
    }

    @GetMapping("listar/todos")
    public List<Sensor> listarTodos() {
        return service.listarTodos();
    }

    @GetMapping("listar/{id}")
    public Sensor listar(@PathVariable Long id) {
        return service.listarSensor(id);
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<String> deletarDispositivo(@PathVariable Long id){
        service.excluirSensor(id);
        return ResponseEntity.ok("Dispositivo deletado com sucesso!");
    }

    @PutMapping("atualizar/{id}")
    public ResponseEntity<String> atualizarDispositivo(@PathVariable Long id, @RequestBody Sensor sensor) {
        service.atualizarSensor(id, sensor);
        return ResponseEntity.ok("Dispositivo atualizado com sucesso!");
    }
}
