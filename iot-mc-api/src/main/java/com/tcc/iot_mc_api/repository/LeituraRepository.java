package com.tcc.iot_mc_api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tcc.iot_mc_api.model.device.Leitura;

public interface LeituraRepository extends JpaRepository<Leitura, Long> {

    List<Leitura> findByDispositivoSensor_Dispositivo_Id(Long dispositivoId);
    
}
