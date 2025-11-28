package com.tcc.iot_mc_api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tcc.iot_mc_api.model.device.Sensor;
import com.tcc.iot_mc_api.model.user.User;

public interface SensorRepository extends JpaRepository<Sensor, Long> {

    List<Sensor> findByUser(User user);
    
}
