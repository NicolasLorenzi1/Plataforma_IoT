package com.tcc.iot_mc_api.dto;

import com.tcc.iot_mc_api.model.user.User;

public record SensorDTO(String nome, String unidadeMedida, String intervaloDeOperacao, String precisao, String status, User user) {
    
}