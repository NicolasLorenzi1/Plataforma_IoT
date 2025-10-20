package com.tcc.iot_mc_api.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.tcc.iot_mc_api.dto.SensorDTO;
import com.tcc.iot_mc_api.model.device.Sensor;
import com.tcc.iot_mc_api.model.user.User;
import com.tcc.iot_mc_api.service.SensorService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/sensor")
public class SensorController {

    private static final Logger logger = LoggerFactory.getLogger(SensorController.class);

    private final SensorService service;

    public SensorController(SensorService service) {
        this.service = service;
    }

    @PostMapping("registrar")
    public ResponseEntity<String> registrarSensor(@RequestBody SensorDTO data, @RequestHeader("X-DEVICE-TOKEN") String dispositivoToken,  @AuthenticationPrincipal User user) {
        logger.info("Solicitação para registrar sensor: {}", data);

        try {
            service.registrarSensor(data, dispositivoToken, user);
            logger.info("Sensor registrado com sucesso");
            return ResponseEntity.ok("Sensor salvo");
        } catch (Exception e) {
            logger.error("Erro ao registrar sensor: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().body("Erro ao salvar sensor");
        }
    }

    @GetMapping("listar/todos")
    public List<Sensor> listarTodos() {
        logger.info("Listando todos os sensores");
        List<Sensor> sensores = service.listarTodos();
        logger.info("Total de sensores encontrados: {}", sensores.size());
        return sensores;
    }

    @GetMapping("listar/{id}")
    public Sensor listar(@PathVariable Long id) {
        logger.info("Buscando sensor com ID {}", id);
        Sensor sensor = service.listarSensor(id);

        if (sensor == null) {
            logger.warn("Sensor com ID {} não encontrado", id);
        } else {
            logger.info("Sensor com ID {} encontrado", id);
        }
        return sensor;
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<String> deletarDispositivo(@PathVariable Long id){
        logger.info("Solicitação para deletar sensor com ID {}", id);

        try {
            service.excluirSensor(id);
            logger.info("Sensor com ID {} deletado com sucesso", id);
            return ResponseEntity.ok("Sensor deletado com sucesso!");
        } catch (Exception e) {
            logger.error("Erro ao deletar sensor com ID {}: {}", id, e.getMessage(), e);
            return ResponseEntity.internalServerError().body("Erro ao deletar sensor");
        }
    }

    @PutMapping("atualizar/{id}")
    public ResponseEntity<String> atualizarDispositivo(@PathVariable Long id, @RequestBody Sensor sensor) {
        logger.info("Solicitação para atualizar sensor com ID {}", id);

        try {
            service.atualizarSensor(id, sensor);
            logger.info("Sensor com ID {} atualizado com sucesso", id);
            return ResponseEntity.ok("Sensor atualizado com sucesso!");
        } catch (Exception e) {
            logger.error("Erro ao atualizar sensor com ID {}: {}", id, e.getMessage(), e);
            return ResponseEntity.internalServerError().body("Erro ao atualizar sensor");
        }
    }
}
