package com.citybank.api.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * DTO de resposta para transações.
 * Utilizado em:
 * - GET /accounts/{id}/transactions: retorna detalhes de cada transação
 * - POST /accounts/{id}/transactions: retorna detalhes da transação criada (depósito ou saque).
 * - POST /transfer: retorna detalhes da transação de transferência
 * - GET /transactions: retorna detalhes de todas as transações (opcional, para fins de histórico)
 */
public class TransactionResponse {

    // Identificador da transação
    private Long id;

    // Tipo: CREDIT, DEBIT, TRANSFER
    private String type;

    // Valor da transação
    private BigDecimal amount;

    // Descrição opcional
    private String description;

    // Conta origem (pode ser null)
    private Long fromAccountId;

    // Conta destino (pode ser null)
    private Long toAccountId;

    // Data/hora da transação
    private LocalDateTime timestamp;

    // Construtor vazio (necessário para frameworks)
    public TransactionResponse() {}

    // Construtor completo
    public TransactionResponse(Long id,
                               String type,
                               BigDecimal amount,
                               String description,
                               Long fromAccountId,
                               Long toAccountId,
                               LocalDateTime timestamp) {
        this.id = id;
        this.type = type;
        this.amount = amount;
        this.description = description;
        this.fromAccountId = fromAccountId;
        this.toAccountId = toAccountId;
        this.timestamp = timestamp;
    }

    // Getters e Setters

    public Long getId() {
        return id;
    }

    public String getType() {
        return type;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public String getDescription() {
        return description;
    }

    public Long getFromAccountId() {
        return fromAccountId;
    }

    public Long getToAccountId() {
        return toAccountId;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setFromAccountId(Long fromAccountId) {
        this.fromAccountId = fromAccountId;
    }

    public void setToAccountId(Long toAccountId) {
        this.toAccountId = toAccountId;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}