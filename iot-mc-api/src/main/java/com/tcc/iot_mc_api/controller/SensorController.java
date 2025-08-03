package com.tcc.iot_mc_api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tcc.iot_mc_api.dto.SensorDTO;
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
}
