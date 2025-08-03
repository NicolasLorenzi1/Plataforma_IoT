package com.tcc.iot_mc_api.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.tcc.iot_mc_api.dto.LeituraDTO;
import com.tcc.iot_mc_api.model.device.Leitura;
import com.tcc.iot_mc_api.repository.LeituraRepository;
import com.tcc.iot_mc_api.repository.SensorRepository;

@Service
public class LeituraService {

    private final SensorRepository sensorRepository;
    private final LeituraRepository leituraRepository;

    public LeituraService(SensorRepository sensorRepository, LeituraRepository leituraRepository) {
        this.sensorRepository = sensorRepository;
        this.leituraRepository = leituraRepository;
    }

    public void registrarLeitura(LeituraDTO leituraDTO){
        Leitura leitura = new Leitura(LocalDateTime.now(), leituraDTO.valor(), sensorRepository.findById(leituraDTO.sensor_id()).get());
        leituraRepository.save(leitura);
    }

}