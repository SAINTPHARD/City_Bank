package com.citybank.api.repository; // pacote para componentes de acesso a dados (repositories)

import org.springframework.data.jpa.repository.JpaRepository; // interface Spring Data que fornece operações CRUD
import org.springframework.stereotype.Repository; // anotação de estereótipo para componentes de repositório

import com.citybank.api.entity.Account;

@Repository // marca a interface como um bean de repositório do Spring
public interface AccountRepository extends JpaRepository<Account, Long> { // extende JpaRepository para herdar métodos CRUD (findAll, save, findById, delete, etc.)
    // Nenhum método extra por enquanto; o Spring Data cria implementações em tempo de execução
}