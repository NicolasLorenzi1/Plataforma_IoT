package com.tcc.iot_mc_api.model.device;

public enum DispositivoTokenRole {
    EDITOR("editor"),
    LEITOR("leitor"),
    DONO("dono");

    private String role;

    DispositivoTokenRole(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }

}
