package com.tcc.iot_mc_api.service;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.tcc.iot_mc_api.model.device.Dispositivo;
import com.tcc.iot_mc_api.model.device.DispositivoToken;
import com.tcc.iot_mc_api.model.device.DispositivoTokenRole;
import com.tcc.iot_mc_api.repository.DispositivoTokenRepository;

@Service
public class DispositivoTokenService {

    private final DispositivoTokenRepository repository;

    public DispositivoTokenService(DispositivoTokenRepository repository) {
        this.repository = repository;
    }

    public String gerarToken(){
        return UUID.randomUUID().toString();
    }

    public DispositivoToken salvarToken(Dispositivo dispositivo){
        DispositivoToken token = new DispositivoToken(gerarToken(), LocalDateTime.now().plusDays(7), dispositivo, DispositivoTokenRole.EDITOR);
        repository.save(token);
        return token;
    }

    public boolean validarToken(String token) {
        return repository.findByToken(token)
            .filter(t -> t.getDataValidade().isAfter(LocalDateTime.now()))
            .isPresent();
    }

}
