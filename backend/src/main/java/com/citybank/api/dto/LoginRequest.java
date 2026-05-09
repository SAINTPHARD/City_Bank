package com.citybank.api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

/**
 * DTO para requisição de login.
 */
public class LoginRequest {
    /**
     * E-mail do usuário. Obrigatório e deve ser válido.
     */
    @Email(message = "E-mail inválido")
    @NotBlank(message = "E-mail é obrigatório")
    private String email;

    /**
     * Senha do usuário. Não pode ser vazia.
     */
    @NotBlank(message = "Senha é obrigatória")
    private String password;

    // Getters e setters
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
