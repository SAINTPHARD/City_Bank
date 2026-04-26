package com.citybank.api.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.citybank.api.entity.Account;
import com.citybank.api.entity.Transaction;
import com.citybank.api.repository.TransactionRepository;

@Service
public class TransactionService {

    private final TransactionRepository repository;

    public TransactionService(TransactionRepository repository) {
        this.repository = repository;
    }

    /**
     * Registra uma transação. Para transferências, informe both fromAccount e toAccount.
     * Para depósitos/saques, informe apenas fromAccount ou toAccount conforme o caso (o outro pode ser null).
     */
    public Transaction recordTransaction(Account fromAccount, Account toAccount, BigDecimal amount, Transaction.TransactionType type, String description) {
        Transaction tx = new Transaction(fromAccount, toAccount, amount, type, description);
        return repository.save(tx);
    }

    // Listar todas as transações
    public List<Transaction> findAll() {
        return repository.findAll();
    }

    // Retorna todas as transações onde a conta especificada é either origem ou destino
    public List<Transaction> findByAccountId(Long accountId) {
        return repository.findByFromAccountIdOrToAccountId(accountId, accountId);
    }

}
