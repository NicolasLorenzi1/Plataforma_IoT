package com.tcc.iot_mc_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tcc.iot_mc_api.dto.DispositivoSensorDTO;
import com.tcc.iot_mc_api.service.DispositivoSensorService;

@RestController
@RequestMapping("/api/dispositivo/{dispositivoId}/sensor")
public class DispositivoSensorController {

    @Autowired
    private DispositivoSensorService service;

    @PostMapping
    public ResponseEntity<Void> associarSensor(@PathVariable Long dispositivoId, @RequestBody DispositivoSensorDTO dto) {
        service.vincularSensorAoDispositivo(dispositivoId, dto.sensorId());
        return ResponseEntity.ok().build();
    }
}

