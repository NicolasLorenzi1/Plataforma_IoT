package com.tcc.iot_mc_api.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.tcc.iot_mc_api.dto.LeituraDTO;
import com.tcc.iot_mc_api.model.device.DispositivoSensor;
import com.tcc.iot_mc_api.model.device.Leitura;
import com.tcc.iot_mc_api.repository.DispositivoSensorRepository;
import com.tcc.iot_mc_api.repository.LeituraRepository;

@Service
public class LeituraService {

    private final DispositivoSensorRepository dispositivoSensorRepository;
    private final LeituraRepository leituraRepository;

    public LeituraService(
        DispositivoSensorRepository dispositivoSensorRepository,
        LeituraRepository leituraRepository
    ) {
        this.dispositivoSensorRepository = dispositivoSensorRepository;
        this.leituraRepository = leituraRepository;
    }

    public void registrarLeitura(LeituraDTO leituraDTO) {
        DispositivoSensor dispositivoSensor = dispositivoSensorRepository.findById(leituraDTO.dispositivoSensorId())
            .orElseThrow(() -> new RuntimeException("Relação Dispositivo-Sensor não encontrada"));

        Leitura leitura = new Leitura(LocalDateTime.now(), leituraDTO.valor(), dispositivoSensor);

        leituraRepository.save(leitura);
    }

    public List<Leitura> listarTodos() {
        return leituraRepository.findAll();
    }
}
