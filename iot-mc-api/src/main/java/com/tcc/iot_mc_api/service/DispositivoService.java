package com.tcc.iot_mc_api.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tcc.iot_mc_api.dto.DispositivoDTO;
import com.tcc.iot_mc_api.model.device.Dispositivo;
import com.tcc.iot_mc_api.model.device.DispositivoToken;
import com.tcc.iot_mc_api.model.user.User;
import com.tcc.iot_mc_api.repository.DispositivoRepository;

@Service
public class DispositivoService {

    @Autowired
    private DispositivoRepository repository;

    @Autowired
    private DispositivoTokenService tokenService;

    @Autowired
    private DispositivoSensorService dispositivoSensorService;


    public String registrarDispositivo(DispositivoDTO dispositivoDTO, User user) {
        Dispositivo dispositivo = new Dispositivo(
            dispositivoDTO.nome(),
            dispositivoDTO.local(),
            LocalDateTime.now(),
            dispositivoDTO.status(),
            user
        );

        repository.save(dispositivo);

        DispositivoToken token = tokenService.gerarTokenParaDispositivo(dispositivo);

        return token.getToken();
    }

    public void associarSensorADispositivo(Long sensorId, String dispositivoToken) {
        Dispositivo dispositivo = tokenService.getDispositivoByToken(dispositivoToken);
        dispositivoSensorService.vincularSensorAoDispositivo(dispositivo.getId(), sensorId);
    }

    public void excluirDispositivo(Long id) {
        Dispositivo dispositivo = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Dispositivo não encontrado"));

        repository.delete(dispositivo);
    }

    public void atualizarDispositivo(Long id, DispositivoDTO dispositivoAtualizado) {
        Dispositivo dispositivo = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Dispositivo não encontrado"));

        dispositivo.setNome(dispositivoAtualizado.nome());
        dispositivo.setLocal(dispositivoAtualizado.local());
        dispositivo.setStatus(dispositivoAtualizado.status());

        repository.save(dispositivo);
    }

    public Dispositivo listarDispositivo(Long id) {
        return repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Dispositivo não encontrado"));
    }

    public List<Dispositivo> listarTodos() {
        return repository.findAll();
    }

    public Dispositivo listarPorToken(String token) {
        Dispositivo dispositivo = tokenService.getDispositivoByToken(token);
        return dispositivo;
    }
}
