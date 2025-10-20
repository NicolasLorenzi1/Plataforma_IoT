package com.tcc.iot_mc_api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.tcc.iot_mc_api.model.device.Dispositivo;
import com.tcc.iot_mc_api.model.device.DispositivoSensor;
import com.tcc.iot_mc_api.model.device.Sensor;
import com.tcc.iot_mc_api.repository.DispositivoRepository;
import com.tcc.iot_mc_api.repository.DispositivoSensorRepository;
import com.tcc.iot_mc_api.repository.SensorRepository;

@Service
public class DispositivoSensorService {

    private final DispositivoSensorRepository repository;
    private final DispositivoRepository dispositivoRepository;
    private final SensorRepository sensorRepository;

    public DispositivoSensorService(
            DispositivoSensorRepository repository,
            DispositivoRepository dispositivoRepository,
            SensorRepository sensorRepository) {
        this.repository = repository;
        this.dispositivoRepository = dispositivoRepository;
        this.sensorRepository = sensorRepository;
    }

    public DispositivoSensor vincularSensorAoDispositivo(Long dispositivoId, Long sensorId) {
        Dispositivo dispositivo = dispositivoRepository.findById(dispositivoId)
                .orElseThrow(() -> new RuntimeException("Dispositivo não encontrado"));
        Sensor sensor = sensorRepository.findById(sensorId)
                .orElseThrow(() -> new RuntimeException("Sensor não encontrado"));

        DispositivoSensor ds = new DispositivoSensor(dispositivo, sensor);
        return repository.save(ds);
    }

    public List<DispositivoSensor> listarVinculosPorDispositivo(Long dispositivoId) {
        return repository.findByDispositivoId(dispositivoId);
    }

    public void removerVinculo(Long id) {
        repository.deleteById(id);
    }
}
