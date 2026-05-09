package com.citybank.api.security;

import com.citybank.api.exception.BusinessException;
import com.citybank.api.exception.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 * Handler global para exceções de segurança e de negócio.
 * Centraliza o tratamento e padroniza as respostas de erro.
 */
@ControllerAdvice
public class SecurityExceptionHandler {

    /**
     * Trata falhas de autenticação (usuário/senha inválidos).
     */
    @ExceptionHandler(BadCredentialsException.class)
    @ResponseBody
    public ResponseEntity<?> handleBadCredentials(BadCredentialsException ex, HttpServletRequest request) {
        return buildResponse(HttpStatus.UNAUTHORIZED, "Credenciais inválidas.", ex, request);
    }

    /**
     * Trata tentativas de acesso negado (sem permissão).
     */
    @ExceptionHandler(AccessDeniedException.class)
    @ResponseBody
    public ResponseEntity<?> handleAccessDenied(AccessDeniedException ex, HttpServletRequest request) {
        return buildResponse(HttpStatus.FORBIDDEN, "Acesso negado.", ex, request);
    }

    /**
     * Trata exceções de negócio personalizadas.
     */
    @ExceptionHandler(BusinessException.class)
    @ResponseBody
    public ResponseEntity<?> handleBusiness(BusinessException ex, HttpServletRequest request) {
        return buildResponse(HttpStatus.BAD_REQUEST, ex.getMessage(), ex, request);
    }

    /**
     * Trata exceções de recurso não encontrado.
     */
    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseBody
    public ResponseEntity<?> handleNotFound(ResourceNotFoundException ex, HttpServletRequest request) {
        return buildResponse(HttpStatus.NOT_FOUND, ex.getMessage(), ex, request);
    }

    /**
     * Trata exceções genéricas.
     */
    @ExceptionHandler(Exception.class)
    @ResponseBody
    public ResponseEntity<?> handleGeneric(Exception ex, HttpServletRequest request) {
        return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Erro interno no servidor.", ex, request);
    }

    /**
     * Monta a resposta padronizada de erro.
     */
    private ResponseEntity<?> buildResponse(HttpStatus status, String message, Exception ex, HttpServletRequest request) {
        Map<String, Object> body = new HashMap<>();
        body.put("timestamp", LocalDateTime.now());
        body.put("status", status.value());
        body.put("error", status.getReasonPhrase());
        body.put("message", message);
        body.put("path", request.getRequestURI());
        return ResponseEntity.status(status).body(body);
    }
}