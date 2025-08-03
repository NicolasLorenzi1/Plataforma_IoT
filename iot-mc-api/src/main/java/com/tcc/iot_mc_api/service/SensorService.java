package com.tcc.iot_mc_api.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.tcc.iot_mc_api.dto.SensorDTO;
import com.tcc.iot_mc_api.model.device.Sensor;
import com.tcc.iot_mc_api.repository.SensorRepository;

@Service
public class SensorService {
    private final SensorRepository repository;

    public SensorService(SensorRepository repository) {
        this.repository = repository;
    }

    public void registrarSensor(SensorDTO data){
        Sensor sensor = new Sensor(data.nome(), data.unidadeMedida(), data.status(), data.precisao(), data.intervaloDeOperacao(), LocalDateTime.now());
        repository.save(sensor);
    }
}
