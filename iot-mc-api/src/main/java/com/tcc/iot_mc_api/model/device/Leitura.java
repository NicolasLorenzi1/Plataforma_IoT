package com.tcc.iot_mc_api.model.device;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Leituras")
@Getter
@Setter
@NoArgsConstructor
public class Leitura {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private long id;

    @Column(nullable = false)
    private LocalDateTime tempoDaLeitura;

    @Column(nullable = false)
    private double valor;

    @ManyToOne
    @JoinColumn(name = "dispositivo_sensor_id")
    private DispositivoSensor dispositivoSensor;


    public Leitura(LocalDateTime tempoDaLeitura, double valor, DispositivoSensor dispositivoSensor) {
        this.tempoDaLeitura = tempoDaLeitura;
        this.valor = valor;
        this.dispositivoSensor = dispositivoSensor;
    }

}
