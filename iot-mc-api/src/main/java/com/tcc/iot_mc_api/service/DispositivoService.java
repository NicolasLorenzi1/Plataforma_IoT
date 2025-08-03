package com.tcc.iot_mc_api.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.tcc.iot_mc_api.dto.DispositivoDTO;
import com.tcc.iot_mc_api.model.device.Dispositivo;
import com.tcc.iot_mc_api.model.device.DispositivoToken;
import com.tcc.iot_mc_api.repository.DispositivoRepository;

@Service
public class DispositivoService {

    private final DispositivoRepository repository;
    private final DispositivoTokenService tokenService;

    public DispositivoService(DispositivoRepository repository, DispositivoTokenService tokenService) {
        this.repository = repository;
        this.tokenService = tokenService;
    }

    public void registrarDispositivo(DispositivoDTO dispositivoDTO){
        Dispositivo dispositivo = new Dispositivo(dispositivoDTO.nome(), dispositivoDTO.local(), LocalDateTime.now(), dispositivoDTO.status());
        repository.save(dispositivo); //para salvar e gerar o ID
        DispositivoToken token = tokenService.salvarToken(dispositivo);      
        dispositivo.setToken(token);  
        repository.save(dispositivo); 
    }

}
