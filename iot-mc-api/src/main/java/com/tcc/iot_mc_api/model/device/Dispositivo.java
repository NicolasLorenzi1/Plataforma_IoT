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
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Dispositivos")
@Getter
@Setter
@NoArgsConstructor
public class Dispositivo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String local;

    @Column(nullable = false)
    private LocalDateTime criacao;

    @Column(nullable = false)
    private String status;

    @OneToMany(mappedBy = "dispositivo")
    private List<Sensor> sensores;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToOne(mappedBy = "dispositivo")
    private DispositivoToken token;


    public Dispositivo(String nome, String local, LocalDateTime criacao, String status) {
        this.nome = nome;
        this.local = local;
        this.criacao = criacao;
        this.status = status;
    }

}
