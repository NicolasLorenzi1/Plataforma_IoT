package com.tcc.iot_mc_api.dto;

import com.tcc.iot_mc_api.model.user.User;

public record DispositivoDTO(String nome, String local, String status, User user) {
    
}
