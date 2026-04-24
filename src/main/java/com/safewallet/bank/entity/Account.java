package com.safewallet.bank.entity; // pacote onde ficam as entidades JPA

import jakarta.persistence.*; // import de anotações JPA (Entity, Table, Id, Column, etc.)

import java.math.BigDecimal; // import para representação de valores monetários com precisão
import java.util.Objects; // import para equals e hashCode

@Entity // indica que esta classe é uma entidade JPA (mapeada para uma tabela)
@Table(name = "accounts") // define o nome da tabela no banco de dados
public class Account { // classe que representa a conta bancária

    @Id // marca o campo como chave primária
    @GeneratedValue(strategy = GenerationType.IDENTITY) // define geração automática de ID (auto-increment)
    private Long id; // identificador único da conta

    @Column(nullable = false) // coluna obrigatória no banco de dados
    private String owner; // nome do proprietário da conta

    @Column(nullable = false) // coluna obrigatória no banco de dados
    private BigDecimal balance; // saldo da conta, usando BigDecimal para precisão

    public Account() { // construtor vazio exigido pelo JPA
    }

    public Account(Long id, String owner, BigDecimal balance) { // construtor com todos os campos
        this.id = id; // atribui id
        this.owner = owner; // atribui owner
        this.balance = balance; // atribui balance
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
    public boolean equals(Object o) { // compara igualdade baseada no id
        if (this == o) return true; // verifica referência
        if (!(o instanceof Account)) return false; // verifica tipo
        Account account = (Account) o; // cast para Account
        return Objects.equals(id, account.id); // compara ids
    }

    @Override
    public int hashCode() { // hashCode baseado no id
        return Objects.hash(id); // retorna hash para id
    }

    /**
	 * O método toString é útil para depuração e logging, fornecendo uma representação legível da entidade.
	 * Ele inclui os principais campos da conta (id, owner e balance) para facilitar a identificação durante a análise de logs.
	 *
    @Override
    public String toString() { // representação em String da entidade
        return "Account{" +
                "id=" + id +
                ", owner='" + owner + '\'' +
                ", balance=" + balance +
                '}'; // forma legível para logs/debug
    }
     */
} // fim da classe Account