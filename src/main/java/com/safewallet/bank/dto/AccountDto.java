package com.safewallet.bank.dto; // pacote para objetos de transferência (DTOs)

import java.math.BigDecimal; // import para BigDecimal usado no saldo
import java.util.Objects; // import para equals e hashCode

public class AccountDto { // DTO usado para transferir dados de/para a API
    private Long id; // identificador opcional (pode ser null ao criar)
    private String owner; // nome do proprietário
    private BigDecimal balance; // saldo da conta

    public AccountDto() { // construtor vazio necessário para desserialização JSON
    }

    public AccountDto(Long id, String owner, BigDecimal balance) { // construtor com campos
        this.id = id; // define id
        this.owner = owner; // define owner
        this.balance = balance; // define balance
    }

    public Long getId() { // getter do id
        return id; // retorna id
    }

    public void setId(Long id) { // setter do id
        this.id = id; // define id
    }

    public String getOwner() { // getter do owner
        return owner; // retorna owner
    }

    public void setOwner(String owner) { // setter do owner
        this.owner = owner; // define owner
    }

    public BigDecimal getBalance() { // getter do balance
        return balance; // retorna balance
    }

    public void setBalance(BigDecimal balance) { // setter do balance
        this.balance = balance; // define balance
    }

    @Override
    public boolean equals(Object o) { // verifica igualdade baseada no id
        if (this == o) return true; // referência igual
        if (!(o instanceof AccountDto)) return false; // verifica tipo
        AccountDto that = (AccountDto) o; // cast para AccountDto
        return Objects.equals(id, that.id); // compara ids
    }

    @Override
    public int hashCode() { // calcula hash baseado no id
        return Objects.hash(id); // retorna hash
    }

    /**
    @Override
    public String toString() { // representação em string para logs
        return "AccountDto{" +
                "id=" + id +
                ", owner='" + owner + '\'' +
                ", balance=" + balance +
                '}';
    }
     */
}