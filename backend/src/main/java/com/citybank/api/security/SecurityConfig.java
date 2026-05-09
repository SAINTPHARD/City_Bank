package com.citybank.api.security;

import com.citybank.api.security.SecurityFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Classe de configuração do Spring Security.
 * Define a cadeia de filtros, endpoints públicos, autenticação e criptografia de senhas.
 */
@Configuration
@EnableMethodSecurity // Permite uso de anotações como @PreAuthorize nos controllers/services
public class SecurityConfig {

    @Autowired
    private SecurityFilter securityFilter; // Filtro customizado para autenticação JWT/token

    /**
     * Configura a cadeia de filtros de segurança e as regras de autorização.
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Desabilita CSRF para APIs stateless
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Sem sessão (JWT)
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/auth/**", "/swagger-ui/**", "/v3/api-docs/**").permitAll() // Endpoints públicos
                .anyRequest().authenticated() // Demais endpoints exigem autenticação
            )
            .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class); // Adiciona filtro customizado antes do filtro padrão
        return http.build();
    }

    /**
     * Bean para criptografia de senhas usando BCrypt.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Bean para gerenciar autenticação.
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}