package com.tcc.iot_mc_api.model.device;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Sensores")
@Getter
@Setter
@NoArgsConstructor
public class Sensor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private long id;

    @Column(nullable = false)
    private String nome;

    @OneToMany(mappedBy = "sensor")
    private List<Leitura> leituras;

    @Column(nullable = false)
    private String unidadeMedida;

    @Column()
    private String intervaloDeOperacao;

    @Column()
    private String precisao;

    @Column(nullable = false)
    private LocalDateTime criacao;

    @Column(nullable = false)
    private String status;

    @ManyToOne
    @JoinColumn(name = "dispositivo_id")
    private Dispositivo dispositivo;

    public Sensor(String nome, String unidadeMedida, String status, String precisao, String intervalorDeOperacao, LocalDateTime criacao) {
        this.nome = nome;
        this.unidadeMedida = unidadeMedida;
        this.status = status;
        this.precisao = precisao;
        this.intervaloDeOperacao = intervalorDeOperacao;
        this.criacao = criacao;
    }
}
