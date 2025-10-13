package com.tcc.iot_mc_api.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tcc.iot_mc_api.dto.LeituraDTO;
import com.tcc.iot_mc_api.service.LeituraService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/leitura")
public class LeituraController {
    
    private static final Logger logger = LoggerFactory.getLogger(LeituraController.class);

    private final LeituraService leituraService;

    public LeituraController(LeituraService leituraService) {
        this.leituraService = leituraService;
    }

    @PostMapping("enviarDados")
    public ResponseEntity<String> receberLeitura(@RequestBody LeituraDTO leituraDTO) {
        logger.info("Recebida leitura: {}", leituraDTO);

        try {
            leituraService.registrarLeitura(leituraDTO);
            logger.info("Leitura salva com sucesso");
            return ResponseEntity.ok("Valores recebidos e salvos");
        } catch (Exception e) {
            logger.error("Erro ao salvar leitura: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().body("Erro ao salvar leitura");
        }
    }
}
