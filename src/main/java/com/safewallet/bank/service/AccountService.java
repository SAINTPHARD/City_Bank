package com.safewallet.bank.service; // pacote para serviços (lógica de negócio)

import java.math.BigDecimal;
import java.util.List; // import para List
import java.util.Optional; // import para Optional
import java.util.stream.Collectors; // import para coletar streams

import org.springframework.stereotype.Service; // anotação para marcar classe de serviço no Spring

import com.safewallet.bank.dto.AccountDto; // DTO usado pelo serviço
import com.safewallet.bank.entity.Account; // entidade usada pelo serviço
import com.safewallet.bank.repository.AccountRepository; // repository para persistência

import jakarta.transaction.Transactional;

@Service // registra a classe como um bean de serviço do Spring
public class AccountService { // serviço que implementa a lógica CRUD para accounts

    private final AccountRepository repository; // referência ao repository para operações de BD

    public AccountService(AccountRepository repository) { // construtor com injeção do repository
        this.repository = repository; // atribui o repository injetado
    }

    public AccountDto toDto(Account acc) { // converte entidade Account para AccountDto
        AccountDto dto = new AccountDto(); // cria um DTO vazio
        dto.setId(acc.getId()); // copia id da entidade para o DTO
        dto.setOwner(acc.getOwner()); // copia owner
        dto.setBalance(acc.getBalance()); // copia balance
        return dto; // retorna o DTO preenchido
    }

    public Account toEntity(AccountDto dto) { // converte AccountDto para entidade Account
        Account acc = new Account(); // cria nova entidade
        acc.setId(dto.getId()); // define id (pode ser null para criação)
        acc.setOwner(dto.getOwner()); // define owner
        acc.setBalance(dto.getBalance()); // define balance
        return acc; // retorna a entidade
    }

    public List<AccountDto> findAll() { // retorna todas as contas como lista de DTOs
        return repository.findAll().stream() // busca todas as entidades do DB
                .map(this::toDto) // converte cada entidade em DTO
                .collect(Collectors.toList()); // coleta em uma lista
    }

    public Optional<AccountDto> findById(Long id) { // busca uma conta por id
        return repository.findById(id) // busca entidade opcional
                .map(this::toDto); // se presente, converte para DTO
    }

    public AccountDto create(AccountDto dto) { // cria uma nova conta a partir do DTO
        Account saved = repository.save(toEntity(dto)); // converte DTO para entidade e salva no DB
        return toDto(saved); // converte entidade salva (com id) de volta para DTO e retorna
    }

    public Optional<AccountDto> update(Long id, AccountDto dto) { // atualiza uma conta existente
        return repository.findById(id).map(existing -> { // busca a entidade e se existir executa o update
            existing.setOwner(dto.getOwner()); // atualiza owner
            existing.setBalance(dto.getBalance()); // atualiza balance
            return toDto(repository.save(existing)); // salva e retorna o DTO atualizado
        }); // se não existir, retorna Optional.empty()
    }

    public void delete(Long id) { // deleta uma conta por id
        repository.deleteById(id); // delega ao repository a remoção
    }
    
    // Método de Transferência de fundos entre contas
    @Transactional // garante que a operação seja atômica (tudo ou nada)
    public void transfer(Long fromId, Long toId, BigDecimal amount) {
    	// 1. Buscar a conta de origem, senão lançar erro de exceção
    	Account fromAccount = repository.findById(fromId)
				.orElseThrow(() -> new RuntimeException("Conta de origem não encontrada: " + fromId));
    	
    	// 2. Buscar a conta de destino, senão lançar erro de exceção
		Account toAccount = repository.findById(toId)
				.orElseThrow(() -> new RuntimeException("Conta de destino não encontrada: " + toId));
		
		// 3. Verificar se a conta de origem tem saldo suficiente, senão lançar erro de exceção
		if (fromAccount.getBalance().compareTo(amount) < 0) { // compara saldo com o valor da transferência
			throw new RuntimeException("Saldo insuficiente para transferencia: " + fromId);
		}
		
		// 4. Debitar o valor da conta de origem
		fromAccount.setBalance(fromAccount.getBalance().subtract(amount)); // Retira saldo
        toAccount.setBalance(toAccount.getBalance().add(amount)); // Adiciona saldo
		
		// 5. Salvar as duas contas atualizadas no banco de dados
		repository.save(fromAccount); // salva a conta de origem atualizada
		repository.save(toAccount); // salva a conta de destino atualizada
    }
    
    
    
} // fim da classe AccountService