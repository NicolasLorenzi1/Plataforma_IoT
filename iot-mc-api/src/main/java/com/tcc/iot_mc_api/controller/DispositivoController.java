package com.tcc.iot_mc_api.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tcc.iot_mc_api.dto.DispositivoDTO;
import com.tcc.iot_mc_api.service.DispositivoService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
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
        service.registrarDispositivo(data);             
        return ResponseEntity.ok("Dispositivo salvo");
    }
    
    
}
