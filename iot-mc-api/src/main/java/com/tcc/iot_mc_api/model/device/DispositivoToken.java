package com.tcc.iot_mc_api.model.device;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "TokenDispositivo") 
@Getter
@Setter
@NoArgsConstructor
public class DispositivoToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String token;

    @Column(nullable = false)
    private LocalDateTime dataValidade;

    @OneToOne()
    @JoinColumn(name = "dispositivo_id")
    private Dispositivo dispositivo;

    public DispositivoToken(String token, LocalDateTime dataValidade, Dispositivo dispositivo) {
        this.token = token;
        this.dataValidade = dataValidade;
        this.dispositivo = dispositivo;
    }
}
