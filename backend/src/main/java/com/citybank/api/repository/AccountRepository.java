package com.citybank.api.repository; // Pacote correto atualizado

import com.citybank.api.entity.Account; // Import da entidade com o pacote novo
import org.springframework.data.jpa.repository.JpaRepository; // Import do Spring Data

// Interface que herda os métodos de banco de dados (CRUD) do Spring
public interface AccountRepository extends JpaRepository<Account, Long> {
    // Não precisa de código aqui. O JpaRepository já entrega save(), findById(), findAll(), etc.
}