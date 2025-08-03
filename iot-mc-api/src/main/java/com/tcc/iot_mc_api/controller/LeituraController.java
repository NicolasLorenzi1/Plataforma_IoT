package com.tcc.iot_mc_api.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tcc.iot_mc_api.dto.LeituraDTO;
import com.tcc.iot_mc_api.service.LeituraService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/leitura")
public class LeituraController {
    
    private final LeituraService leituraService;

    public LeituraController(LeituraService leituraService) {
        this.leituraService = leituraService;
    }

    @PostMapping("enviarDados")
    public ResponseEntity<String> receberLeitura(@RequestBody LeituraDTO leituraDTO) {
        leituraService.registrarLeitura(leituraDTO);
        return ResponseEntity.ok("valores recebido e salvos");
    }
    
}
