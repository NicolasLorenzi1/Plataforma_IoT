package com.tcc.iot_mc_api.service;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tcc.iot_mc_api.model.device.Dispositivo;
import com.tcc.iot_mc_api.model.device.DispositivoToken;
import com.tcc.iot_mc_api.model.device.DispositivoTokenRole;
import com.tcc.iot_mc_api.repository.DispositivoRepository;
import com.tcc.iot_mc_api.repository.DispositivoTokenRepository;

@Service
public class DispositivoTokenService {

    @Autowired
    private DispositivoTokenRepository repository;

    @Autowired
    private DispositivoRepository dispositivoRepository;


    private String gerarToken() {
        return UUID.randomUUID().toString();
    }

    public DispositivoToken gerarTokenParaDispositivo(Dispositivo dispositivo, boolean isEditor) {
        DispositivoTokenRole role = isEditor ? DispositivoTokenRole.EDITOR : DispositivoTokenRole.LEITOR;

        DispositivoToken token = new DispositivoToken(
            gerarToken(),
            LocalDateTime.now().plusDays(7),
            dispositivo,
            role
        );

        repository.save(token);
        return token;
    }

    public DispositivoToken gerarTokenParaDispositivo(Long dispositivoId, String roleData) {
        DispositivoTokenRole role = roleData.equals("editor") ? DispositivoTokenRole.EDITOR : DispositivoTokenRole.LEITOR;
        Dispositivo dispositivo = dispositivoRepository.findById(dispositivoId)
            .orElseThrow(() -> new RuntimeException("Dispositivo não encontrado"));

        DispositivoToken token = new DispositivoToken(
            gerarToken(),
            LocalDateTime.now().plusDays(7),
            dispositivo,
            role
        );

        repository.save(token);
        return token;
    }

    public boolean validarToken(String token) {
        return repository.findByToken(token)
            .filter(t -> !t.isRevoked() && t.getDataValidade().isAfter(LocalDateTime.now()))
            .isPresent();
    }

    public Dispositivo getDispositivoByToken(String token) {
        DispositivoToken dispositivoToken = repository.findByToken(token)
            .orElseThrow(() -> new RuntimeException("Token inválido ou expirado"));
        return dispositivoToken.getDispositivo();
    }
}
