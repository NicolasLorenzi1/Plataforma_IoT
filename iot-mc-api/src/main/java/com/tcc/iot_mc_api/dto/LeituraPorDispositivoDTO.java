package com.tcc.iot_mc_api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class LeituraPorDispositivoDTO {

    private Long sensorId;
    private String sensorNome;
    private double valor;
    private LocalDateTime tempoDaLeitura;

}
