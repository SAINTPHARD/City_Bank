package com.citybank.api.repository;

import com.citybank.api.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
	List<Transaction> findByFromAccountIdOrToAccountId(Long fromId, Long toId);
}
