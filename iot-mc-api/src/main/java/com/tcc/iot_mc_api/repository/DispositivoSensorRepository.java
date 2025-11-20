package com.tcc.iot_mc_api.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;
import com.tcc.iot_mc_api.model.device.DispositivoSensor;

import jakarta.transaction.Transactional;

@Repository
public interface DispositivoSensorRepository extends JpaRepository<DispositivoSensor, Long> {

    List<DispositivoSensor> findByDispositivoId(Long dispositivoId);

    List<DispositivoSensor> findBySensorId(Long sensorId);

    boolean existsByDispositivoIdAndSensorId(Long dispositivoId, Long sensorId);

    @Modifying
    @Transactional
    void deleteByDispositivoIdAndSensorId(Long dispositivoId, Long sensorId);

}
