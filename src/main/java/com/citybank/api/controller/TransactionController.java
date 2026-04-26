package com.citybank.api.controller;

import com.citybank.api.dto.TransactionRequest;
import com.citybank.api.entity.Transaction;
import com.citybank.api.service.AccountService;
import com.citybank.api.service.TransactionService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/accounts/{id}/transactions") // base REST mais limpa
public class TransactionController {

    private final TransactionService transactionService;
    private final AccountService accountService;

    // 1.Injeção via construtor (boa prática)
    public TransactionController(TransactionService transactionService,
                                 AccountService accountService) {
        this.transactionService = transactionService;
        this.accountService = accountService;
    }

    // ================================
    // 2. LISTAR TRANSAÇÕES DA CONTA
    // ================================
    @GetMapping
    public ResponseEntity<List<Transaction>> listByAccount(@PathVariable Long id) {

        // 2.1- Busca todas as transações da conta (origem ou destino)
        List<Transaction> transactions = transactionService.findByAccountId(id);

        return ResponseEntity.ok(transactions);
    }

    // ============================================
    // 3 CRIAR TRANSAÇÃO (DEPÓSITO OU SAQUE)
    // ============================================
    @PostMapping
    public ResponseEntity<Transaction> createForAccount(
            @PathVariable Long id,
            @RequestBody TransactionRequest request) {

        // Define tipo padrão como CREDIT como Padrão
        String type = request.getType() != null
                ? request.getType().toUpperCase()
                : "CREDIT";

        Transaction tx;

        // Para saque
        if ("DEBIT".equals(type)) {

            tx = accountService.recordWithdrawal(
                    id,
                    request.getAmount(),
                    request.getDescription()
            );

        } else { // depósito

            tx = accountService.recordDeposit(
                    id,
                    request.getAmount(),
                    request.getDescription()
            );
        }

        // Retorna 201 CREATED com localização do recurso criado
        return ResponseEntity.created(
                URI.create("/accounts/" + id + "/transactions/" + tx.getId())
        ).body(tx);
    }
}