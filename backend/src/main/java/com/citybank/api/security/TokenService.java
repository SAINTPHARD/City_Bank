package com.citybank.api.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

/**
 * Serviço responsável por gerar e validar tokens JWT.
 * Implementação detalhada e comentada.
 */
@Service
public class TokenService {
    // Chave secreta para assinatura do token (em produção, use variável de ambiente)
    private static final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    // Tempo de expiração do token em milissegundos (exemplo: 1 hora)
    private static final long EXPIRATION = 1000 * 60 * 60;

    /**
     * Gera um token JWT para o usuário autenticado.
     * @param authentication Objeto de autenticação do Spring
     * @return Token JWT
     */
    public String generateToken(Authentication authentication) {
        // Obtém o principal (usuário logado)
        UserDetails user = (UserDetails) authentication.getPrincipal();
        // Data de expiração
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + EXPIRATION);
        // Cria o token JWT
        return Jwts.builder()
                .setSubject(user.getUsername()) // e-mail ou login
                .setIssuedAt(now) // data de emissão
                .setExpiration(expiryDate) // data de expiração
                .signWith(SECRET_KEY) // assina com a chave secreta
                .compact();
    }

    /**
     * Valida o token JWT recebido.
     * @param token Token JWT
     * @return true se válido, false caso contrário
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(SECRET_KEY).build().parseClaimsJws(token);
            return true;
        } catch (Exception ex) {
            return false;
        }
    }

    /**
     * Extrai o username (e-mail) do token JWT.
     * @param token Token JWT
     * @return Username contido no token
     */
    public String getUsernameFromToken(String token) {
        Claims claims = Jwts.parserBuilder().setSigningKey(SECRET_KEY).build().parseClaimsJws(token).getBody();
        return claims.getSubject();
    }
}