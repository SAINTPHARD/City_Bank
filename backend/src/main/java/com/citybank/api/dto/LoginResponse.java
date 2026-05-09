package com.citybank.api.dto;

/**
 * DTO para resposta de login.
 */
public class LoginResponse {
    /**
     * Token JWT gerado após autenticação.
     */
    private String token;

    public LoginResponse(String token) {
        this.token = token;
    }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
}
