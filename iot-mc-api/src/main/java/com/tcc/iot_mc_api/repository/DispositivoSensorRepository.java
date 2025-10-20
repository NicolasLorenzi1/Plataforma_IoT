package com.tcc.iot_mc_api.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.tcc.iot_mc_api.model.device.DispositivoSensor;

@Repository
public interface DispositivoSensorRepository extends JpaRepository<DispositivoSensor, Long> {

    List<DispositivoSensor> findByDispositivoId(Long dispositivoId);

    List<DispositivoSensor> findBySensorId(Long sensorId);

    boolean existsByDispositivoIdAndSensorId(Long dispositivoId, Long sensorId);
}
