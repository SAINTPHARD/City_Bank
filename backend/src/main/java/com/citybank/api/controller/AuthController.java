package com.citybank.api.controller;

import com.citybank.api.dto.LoginRequest;
import com.citybank.api.dto.LoginResponse;
import com.citybank.api.security.TokenService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller responsável pelo endpoint de autenticação (login).
 * Recebe as credenciais, autentica e retorna o token JWT.
 */
@RestController
@RequestMapping("/auth")
public class AuthController {

    /**
     * Gerenciador de autenticação do Spring.
     * Injeta o bean configurado em SecurityConfig.
     */
    @Autowired
    private AuthenticationManager authenticationManager;

    /**
     * Serviço para geração de tokens JWT.
     * Injeta o bean TokenService.
     */
    @Autowired
    private TokenService tokenService;

    /**
     * Endpoint de login. Recebe e-mail e senha, autentica e retorna o token JWT.
     * @param loginRequest DTO com e-mail e senha
     * @return Token JWT em caso de sucesso
     */
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody @Valid LoginRequest loginRequest) {
        try {
            // Cria o token de autenticação do Spring
            UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword());
            // Autentica o usuário
            Authentication authentication = authenticationManager.authenticate(authToken);
            // Gera o token JWT
            String jwt = tokenService.generateToken(authentication);
            // Retorna o token no corpo da resposta
            return ResponseEntity.ok(new LoginResponse(jwt));
        } catch (AuthenticationException ex) {
            // Em caso de falha, retorna 401
            return ResponseEntity.status(401).build();
        }
    }
}