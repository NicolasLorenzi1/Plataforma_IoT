package com.tcc.iot_mc_api.infra.security;

import java.io.IOException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.tcc.iot_mc_api.model.device.DispositivoToken;
import com.tcc.iot_mc_api.model.device.DispositivoTokenRole;
import com.tcc.iot_mc_api.repository.DispositivoTokenRepository;
import com.tcc.iot_mc_api.service.DispositivoTokenService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class DispositivoTokenFilter extends OncePerRequestFilter {

    @Autowired
    private DispositivoTokenService tokenService;

    @Autowired
    private DispositivoTokenRepository repository;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getRequestURI();
        String method = request.getMethod();

        if (path.startsWith("/api/leitura")) {
            String token = request.getHeader("X-DEVICE-TOKEN");

            if (token == null || !tokenService.validarToken(token)) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Token do dispositivo inválido ou expirado");
                return;
            }

            Optional<DispositivoToken> dispositivoToken = repository.findByToken(token);

            if (dispositivoToken.get().getRole() == DispositivoTokenRole.LEITOR && !method.equalsIgnoreCase("GET")) {
                response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                response.getWriter().write("Permissão negada: token de leitura não pode modificar dados");
                return;
            }
        }

        filterChain.doFilter(request, response);
    }

}
