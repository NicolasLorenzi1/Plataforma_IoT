package com.tcc.iot_mc_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tcc.iot_mc_api.model.device.Sensor;

public interface SensorRepository extends JpaRepository<Sensor, Long> {
    
}
