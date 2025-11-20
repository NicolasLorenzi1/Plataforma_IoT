package com.tcc.iot_mc_api.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tcc.iot_mc_api.dto.DispositivoSensorDTO;
import com.tcc.iot_mc_api.model.device.Sensor;
import com.tcc.iot_mc_api.service.DispositivoSensorService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/api/dispositivo/{dispositivoId}/sensor")
public class DispositivoSensorController {

    @Autowired
    private DispositivoSensorService service;

    private static final Logger logger = LoggerFactory.getLogger(DispositivoController.class);


    @PostMapping("/associar")
    public ResponseEntity<Void> associarSensor(@PathVariable Long dispositivoId, @RequestBody DispositivoSensorDTO dto) {
        service.vincularSensorAoDispositivo(dispositivoId, dto.sensorId());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/listarTodos")
    public List<Sensor> listarSensoresAssociados(@PathVariable Long dispositivoId) {
        logger.info("Listando todos os sensores do dispositivo ID {}", dispositivoId);
        List<Sensor> sensores = service.listarSensoresDoDispositivo(dispositivoId);
        logger.info("Total de dispositivos encontrados: {}", sensores.size());
        return sensores;
    }

    @DeleteMapping("/remover/{sensorId}")
    public ResponseEntity<Void> removerSensor(@PathVariable Long dispositivoId, @PathVariable Long sensorId) {
       logger.info("Solicitação para deletar vinculo entre dispositivo ID {} e sensor ID {}", dispositivoId, sensorId);

        try {
            service.removerVinculo(dispositivoId, sensorId);
            logger.info("Vinculo deletado com sucesso entre dispositivo ID {} e sensor ID {}", dispositivoId, sensorId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            logger.error("Erro ao deletar vinculo entre dispositivo ID {} e sensor ID {}: {}", dispositivoId, sensorId, e.getMessage(), e);
            return ResponseEntity.internalServerError().build();
        }
    }

}

