package com.tcc.iot_mc_api.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tcc.iot_mc_api.dto.DispositivoDTO;
import com.tcc.iot_mc_api.model.device.Dispositivo;
import com.tcc.iot_mc_api.model.user.User;
import com.tcc.iot_mc_api.service.DispositivoService;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/dispositivo")
public class DispositivoController {

    private static final Logger logger = LoggerFactory.getLogger(DispositivoController.class);

    private final DispositivoService service;

    public DispositivoController(DispositivoService service) {
        this.service = service;
    }

    @PostMapping("registrar")
    public ResponseEntity<String> registrarDispositivo(@RequestBody DispositivoDTO data, @AuthenticationPrincipal User user) {
        logger.info("Recebida requisição para registrar dispositivo: {}", data);

        try {
            String tokenGerado = service.registrarDispositivo(data, user);  
            logger.info("Dispositivo registrado com sucesso. Token gerado: {}", tokenGerado);
            return ResponseEntity.ok("Dispositivo salvo\nToken:" + tokenGerado);
        } catch (Exception e) {
            logger.error("Erro ao registrar dispositivo: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().body("Erro ao salvar dispositivo");
        }
    }

    
    @GetMapping("listar/todos")
    public List<Dispositivo> listarTodos() {
        logger.info("Listando todos os dispositivos");
        List<Dispositivo> dispositivos = service.listarTodos();
        logger.info("Total de dispositivos encontrados: {}", dispositivos.size());
        return dispositivos;
    }

    @GetMapping("listar/{id}")
    public Dispositivo listar(@PathVariable Long id) {
        logger.info("Buscando dispositivo com ID {}", id);
        Dispositivo dispositivo = service.listarDispositivo(id);

        if (dispositivo == null) {
            logger.warn("Dispositivo com ID {} não encontrado", id);
        } else {
            logger.info("Dispositivo com ID {} encontrado", id);
        }
        return dispositivo;
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<String> deletarDispositivo(@PathVariable Long id){
        logger.info("Solicitação para deletar dispositivo com ID {}", id);

        try {
            service.excluirDispositivo(id);
            logger.info("Dispositivo com ID {} deletado com sucesso", id);
            return ResponseEntity.ok("Dispositivo deletado com sucesso!");
        } catch (Exception e) {
            logger.error("Erro ao deletar dispositivo com ID {}: {}", id, e.getMessage(), e);
            return ResponseEntity.internalServerError().body("Erro ao deletar dispositivo");
        }
    }

    @PutMapping("atualizar/{id}")
    public ResponseEntity<String> atualizarDispositivo(@PathVariable Long id, @RequestBody DispositivoDTO dispositivo,  @AuthenticationPrincipal User user) {
        logger.info("Solicitação para atualizar dispositivo com ID {}", id);

        try {
            service.atualizarDispositivo(id, dispositivo, user);
            logger.info("Dispositivo com ID {} atualizado com sucesso", id);
            return ResponseEntity.ok("Dispositivo atualizado com sucesso!");
        } catch (Exception e) {
            logger.error("Erro ao atualizar dispositivo com ID {}: {}", id, e.getMessage(), e);
            return ResponseEntity.internalServerError().body("Erro ao atualizar dispositivo");
        }
    }

    @GetMapping("/por-token/{token}")
    public ResponseEntity<?> listarPorToken(@PathVariable String token) {
        try {
            Dispositivo dispositivo = service.listarPorToken(token);
            return ResponseEntity.ok(
                new java.util.HashMap<String, Object>() {{
                    put("id", dispositivo.getId());
                    put("nome", dispositivo.getNome());
                    put("local", dispositivo.getLocal());
                }}
            );
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Token inválido ou dispositivo não encontrado");
        }
    }

    
}
