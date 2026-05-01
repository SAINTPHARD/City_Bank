package com.citybank.api.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity	// marca a classe como uma entidade JPA (mapeada para tabela)
@Table(name = "transactions", indexes = {	//
        @Index(name = "idx_from_account", columnList = "from_account_id"),	// índice para otimizar consultas por conta origem
        @Index(name = "idx_to_account", columnList = "to_account_id"),		// índice para otimizar consultas por conta destino	
        @Index(name = "idx_timestamp", columnList = "timestamp")		 	// índice para otimizar consultas por data/hora
})
public class Transaction {

	// chave primária da tabela
    @Id	
    
    // Geração automática de ID (auto-incremento)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Conta origem (pode ser null em depósito)
    @ManyToOne
    @JoinColumn(name = "from_account_id")
    private Account fromAccount;

    // Conta destino (pode ser null em saque)
    @ManyToOne
    @JoinColumn(name = "to_account_id")
    private Account toAccount;

    // Valor da transação (com precisão para dinheiro)
    @Column(nullable = false, precision = 19, scale = 2)
    private BigDecimal amount;

    // Tipo da transação (DEPÓSITO, SAQUE, TRANSFERÊNCIA)
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TransactionType type;

    // Descrição opcional
    @Column(length = 255)
    private String description;

    // Data/hora da transação
    @Column(nullable = false, updatable = false)
    private LocalDateTime timestamp;

    // Define automaticamente antes de persistir a data/hora da transação
    @PrePersist
    public void prePersist() {
        this.timestamp = LocalDateTime.now();
    }

    // Construtor vazio (JPA) 
    public Transaction() {}

    // Construtor completo para facilitar criação de transações
    public Transaction(Account fromAccount, Account toAccount,
                       BigDecimal amount, TransactionType type, String description) {
        this.fromAccount = fromAccount;
        this.toAccount = toAccount;
        this.amount = amount;
        this.type = type;
        this.description = description;
    }

    // ================= GETTERS / SETTERS =================
    // Métodos de acesso para os campos da entidade

    public Long getId() {
        return id;
    }

    public Account getFromAccount() {
        return fromAccount;
    }

    public void setFromAccount(Account fromAccount) {
        this.fromAccount = fromAccount;
    }

    public Account getToAccount() {
        return toAccount;
    }

    public void setToAccount(Account toAccount) {
        this.toAccount = toAccount;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public TransactionType getType() {
        return type;
    }

    public void setType(TransactionType type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    // ================= EQUALS / HASHCODE =================
    // Sobrescreve equals e hashCode para comparar transações por id, o que é importante para coleções e operações de comparação.

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Transaction)) return false;
        Transaction that = (Transaction) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    // ================= TO STRING =================
    // Sobrescreve o método toString para facilitar a depuração e logs, mostrando os campos principais da transação.

    @Override
    public String toString() {
        return "Transaction{" +
                "id=" + id +
                ", fromAccount=" + (fromAccount != null ? fromAccount.getId() : null) +
                ", toAccount=" + (toAccount != null ? toAccount.getId() : null) +
                ", amount=" + amount +
                ", type=" + type +
                ", description='" + description + '\'' +
                ", timestamp=" + timestamp +
                '}';
    }

    // ================= ENUM =================
    // Enum para os tipos de transação: crédito, débito ou transferência

    public enum TransactionType {
        CREDIT,
        DEBIT,
        TRANSFER
    }
}