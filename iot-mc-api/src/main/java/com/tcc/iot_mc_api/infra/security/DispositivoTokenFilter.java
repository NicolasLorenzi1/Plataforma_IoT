package com.tcc.iot_mc_api.infra.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.tcc.iot_mc_api.service.DispositivoTokenService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class DispositivoTokenFilter extends OncePerRequestFilter {

    @Autowired
    private DispositivoTokenService tokenService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getRequestURI();

        if ((path.startsWith("/api/sensor") || path.startsWith("/api/leitura"))) {
            String token = request.getHeader("X-DEVICE-TOKEN");

            if (token == null || !tokenService.validarToken(token)) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Token do dispositivo inválido ou expirado");
                return;
            }
        }

        filterChain.doFilter(request, response);
    }

}
