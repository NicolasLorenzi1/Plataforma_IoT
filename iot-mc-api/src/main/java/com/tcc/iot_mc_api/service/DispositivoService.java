package com.tcc.iot_mc_api.service;

import java.time.LocalDateTime;
import java.util.List;

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

    public String registrarDispositivo(DispositivoDTO dispositivoDTO) {
        Dispositivo dispositivo = new Dispositivo(dispositivoDTO.nome(), dispositivoDTO.local(), LocalDateTime.now(),
                dispositivoDTO.status());
        repository.save(dispositivo); // para salvar e gerar o ID
        // DispositivoToken token = tokenService.salvarToken(dispositivo);
        // dispositivo.setToken(token);
        repository.save(dispositivo);
        return dispositivo.getToken().getToken();
    }

    public void excluirDispositivo(Long id) {
        repository.deleteById(id);
    }

    public void atualizarDispositivo(Long id, Dispositivo dispositivoAtualizado) {
        Dispositivo dispositivo = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Dispositivo não encontrado"));

        dispositivo.setNome(dispositivoAtualizado.getNome());
        dispositivo.setLocal(dispositivoAtualizado.getLocal());
        dispositivo.setCriacao(dispositivoAtualizado.getCriacao());
        dispositivo.setSensores(dispositivoAtualizado.getSensores());
        dispositivo.setStatus(dispositivoAtualizado.getStatus());
        dispositivo.setToken(dispositivoAtualizado.getToken());
        dispositivo.setUser(dispositivoAtualizado.getUser());

        repository.save(dispositivo);
    }

    public Dispositivo listarDispositivo(Long id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Dispositivo não encontrado"));
    }

    public List<Dispositivo> listarTodos() {
        return repository.findAll();
    }

}
