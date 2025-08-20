package com.tcc.iot_mc_api.model.device;

import java.time.LocalDateTime;
import java.util.List;

import com.tcc.iot_mc_api.model.user.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
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

    @ManyToMany(mappedBy = "sensores")
    private List<Dispositivo> dispositivos;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;


    public Sensor(String nome, String unidadeMedida, String status, String precisao, String intervalorDeOperacao, LocalDateTime criacao, User user) {
        this.nome = nome;
        this.unidadeMedida = unidadeMedida;
        this.status = status;
        this.precisao = precisao;
        this.intervaloDeOperacao = intervalorDeOperacao;
        this.criacao = criacao;
        this.user = user;
    }

    public void adicinarDispositivo(Dispositivo dispositivo){
        dispositivos.add(dispositivo);
    }
}
