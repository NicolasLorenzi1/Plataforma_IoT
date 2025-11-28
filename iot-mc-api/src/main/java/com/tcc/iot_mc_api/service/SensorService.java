package com.tcc.iot_mc_api.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tcc.iot_mc_api.dto.SensorDTO;
import com.tcc.iot_mc_api.model.device.Sensor;
import com.tcc.iot_mc_api.model.user.User;
import com.tcc.iot_mc_api.repository.SensorRepository;

@Service
public class SensorService {

    @Autowired
    private SensorRepository repository;


    public void registrarSensor(SensorDTO data, User user) {
        Sensor sensor = new Sensor(
                data.nome(),
                data.unidadeMedida(),
                data.status(),
                data.precisao(),
                data.intervaloDeOperacao(),
                LocalDateTime.now(),
                user);

        repository.save(sensor);

    }

    public void excluirSensor(Long id) {
        repository.deleteById(id);
    }

    public void atualizarSensor(Long id, Sensor sensorAtualizado) {
        Sensor sensor = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sensor não encontrado"));

        sensor.setNome(sensorAtualizado.getNome());
        sensor.setIntervaloDeOperacao(sensorAtualizado.getIntervaloDeOperacao());
        sensor.setPrecisao(sensorAtualizado.getPrecisao());
        sensor.setStatus(sensorAtualizado.getStatus());
        sensor.setUnidadeMedida(sensorAtualizado.getUnidadeMedida());

        repository.save(sensor);
    }

    public Sensor listarSensor(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sensor não encontrado"));
    }

    public List<Sensor> listarTodos() {
        return repository.findAll();
    }

    public List<Sensor> listarPorUsuario(User user) {
        return repository.findByUser(user);
    }
}
