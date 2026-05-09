package com.citybank.api.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Filtro customizado para autenticação JWT.
 * Valida o token em cada requisição e autentica o usuário no contexto do Spring.
 */
@Component
public class SecurityFilter extends OncePerRequestFilter {

    /**
     * Serviço de token JWT.
     */
    @Autowired
    private TokenService tokenService;

    /**
     * Serviço de usuários do Spring (deve implementar UserDetailsService).
     */
    @Autowired
    private UserDetailsService userDetailsService;

    /**
     * Executa a filtragem de cada requisição.
     * Valida o token JWT e autentica o usuário no contexto.
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        // Obtém o header Authorization
        String authHeader = request.getHeader("Authorization");
        String token = null;
        String username = null;

        // Verifica se o header está presente e começa com "Bearer "
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7); // Extrai o token
            // Valida o token
            if (tokenService.validateToken(token)) {
                // Extrai o username do token
                username = tokenService.getUsernameFromToken(token);
                // Se usuário não está autenticado ainda
                if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    // Carrega os dados do usuário
                    UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                    // Cria o token de autenticação do Spring
                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    // Define o usuário autenticado no contexto
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
        }
        // Continua a cadeia normalmente
        filterChain.doFilter(request, response);
    }
}