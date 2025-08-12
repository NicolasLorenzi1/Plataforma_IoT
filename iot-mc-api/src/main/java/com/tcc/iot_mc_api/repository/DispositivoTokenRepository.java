package com.tcc.iot_mc_api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tcc.iot_mc_api.model.device.DispositivoToken;

public interface DispositivoTokenRepository extends JpaRepository<DispositivoToken, Long>{
    Optional<DispositivoToken> findByToken(String token);

}
