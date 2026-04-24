package com.safewallet.bank.controller; // pacote para controllers REST

import com.safewallet.bank.dto.AccountDto; // DTO utilizado nas requisições/respostas
import com.safewallet.bank.service.AccountService; // serviço que contém lógica de negócio
import org.springframework.http.ResponseEntity; // utilitário para construir respostas HTTP
import org.springframework.web.bind.annotation.*; // anotações REST (GetMapping, PostMapping, etc.)

import java.math.BigDecimal;
import java.net.URI; // para construir localização do recurso criado
import java.util.List; // import para List

@RestController // marca a classe como um controller REST (combina @Controller + @ResponseBody)
@RequestMapping("/accounts") // rota base para todos os endpoints deste controller
public class AccountController { // controller que expõe APIs para gerenciar contas

    private final AccountService service; // referência ao serviço para delegar operações

    public AccountController(AccountService service) { // construtor com injeção do serviço
        this.service = service; // atribui o serviço injetado
    }

    @GetMapping // GET /accounts -> retorna lista de contas
    public List<AccountDto> getAll() { // método que trata a listagem
        return service.findAll(); // delega ao serviço e retorna lista de DTOs
    }

    @GetMapping("/{id}") // GET /accounts/{id} -> retorna uma conta por id
    public ResponseEntity<AccountDto> getById(@PathVariable Long id) { // captura o id da URL
        return service.findById(id) // busca via serviço
                .map(ResponseEntity::ok) // se encontrado, retorna 200 OK com o DTO
                .orElseGet(() -> ResponseEntity.notFound().build()); // se não, retorna 404 Not Found
    }

    @PostMapping // POST /accounts -> cria uma nova conta
    public ResponseEntity<AccountDto> create(@RequestBody AccountDto dto) { // desserializa corpo JSON para AccountDto
        AccountDto created = service.create(dto); // cria a conta via serviço
        return ResponseEntity.created(URI.create("/accounts/" + created.getId())).body(created); // retorna 201 Created com Location e o corpo
    }

    @PutMapping("/{id}") // PUT /accounts/{id} -> atualiza uma conta existente
    public ResponseEntity<AccountDto> update(@PathVariable Long id, @RequestBody AccountDto dto) { // recebe id e DTO
        return service.update(id, dto) // tenta atualizar via serviço
                .map(ResponseEntity::ok) // se atualizado, retorna 200 OK com DTO
                .orElseGet(() -> ResponseEntity.notFound().build()); // se não encontrado, retorna 404
    }

    @DeleteMapping("/{id}") // DELETE /accounts/{id} -> remove a conta
    public ResponseEntity<Void> delete(@PathVariable Long id) { // recebe id da URL
        service.delete(id); // delega remoção ao serviço
        return ResponseEntity.noContent().build(); // retorna 204 No Content
    }
    
    
    // Endpoint da transferência de fundos entre contas
    @PostMapping("/transfer") // POST /accounts/transfer -> realiza transferência entre contas
    public ResponseEntity<Void> transfer(
    		@RequestParam Long fromId, 
    		@RequestParam Long toId, 
    		@RequestParam BigDecimal amount
    		) { // recebe ids e valor da transferência
    	
		service.transfer(fromId, toId, amount); // delega a transferência ao serviço
		return ResponseEntity.ok().build(); // retorna 200 OK se a transferência for bem-sucedida
	}
    
} // fim da classe AccountController