package com.tcc.iot_mc_api.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.tcc.iot_mc_api.dto.DispositivoDTO;
import com.tcc.iot_mc_api.model.device.Dispositivo;
import com.tcc.iot_mc_api.model.device.DispositivoToken;
import com.tcc.iot_mc_api.model.user.User;
import com.tcc.iot_mc_api.repository.DispositivoRepository;

@Service
public class DispositivoService {

    private final DispositivoRepository repository;
    private final DispositivoTokenService tokenService;

    public DispositivoService(DispositivoRepository repository, DispositivoTokenService tokenService) {
        this.repository = repository;
        this.tokenService = tokenService;
    }

    public String registrarDispositivo(DispositivoDTO dispositivoDTO, User user) {
        Dispositivo dispositivo = new Dispositivo(
            dispositivoDTO.nome(),
            dispositivoDTO.local(),
            LocalDateTime.now(),
            dispositivoDTO.status(),
            user
        );

        repository.save(dispositivo);

        // Como o dispositivo é novo, geramos um token de editor por padrão
        DispositivoToken token = tokenService.gerarTokenParaDispositivo(dispositivo, true);

        return token.getToken();
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
        dispositivo.setUser(dispositivoAtualizado.user());

        repository.save(dispositivo);
    }

    public Dispositivo listarDispositivo(Long id) {
        return repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Dispositivo não encontrado"));
    }

    public List<Dispositivo> listarTodos() {
        return repository.findAll();
    }
}
