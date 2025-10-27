package com.tcc.iot_mc_api.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tcc.iot_mc_api.dto.DispositivoTokenDTO;
import com.tcc.iot_mc_api.model.device.DispositivoToken;
import com.tcc.iot_mc_api.service.DispositivoTokenService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/token")
public class DispositivoTokenController {

    private static final Logger logger = LoggerFactory.getLogger(DispositivoTokenController.class);

    @Autowired
    private DispositivoTokenService service;

    @PostMapping("gerar")
    public ResponseEntity<String> gerarToken(@RequestBody DispositivoTokenDTO data) {
        logger.info("Recebida requisição para registrar token: {}", data);
        try {
            DispositivoToken tokenGerado = service.gerarTokenParaDispositivo(data.dispositivoId(), data.role());
            logger.info("Token gerado com sucesso. Token gerado: {}", tokenGerado.getToken());
            return ResponseEntity.ok("Token gerado com sucesso\nToken:" + tokenGerado.getToken());
        } catch (Exception e) {
            logger.error("Erro ao gerar token: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().body("Erro ao gerar token");
        }
    }
    
    
}
