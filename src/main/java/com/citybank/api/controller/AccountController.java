package com.citybank.api.controller; // pacote para controllers REST

import java.net.URI; // para construir localização do recurso criado
import java.util.List; // import para List
import java.util.Map;

import org.springframework.http.ResponseEntity; // utilitário para construir respostas HTTP
// anotações REST (GetMapping, PostMapping, etc.)
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.citybank.api.dto.AccountDto;
import com.citybank.api.dto.TransferRequest;
import com.citybank.api.entity.Transaction;
import com.citybank.api.service.AccountService;
import com.citybank.api.service.TransactionService;

@RestController 				// marca a classe como um controller REST (combina @Controller + @ResponseBody)
@RequestMapping("/accounts") 	// rota base para todos os endpoints deste controller
public class AccountController { // controller que expõe APIs para gerenciar contas

    private final AccountService service; // referência ao serviço para delegar operações

    public AccountController(AccountService service) { // construtor com injeção do serviço
        this.service = service; 		// atribui o serviço injetado
    }

    // ================================
    // 1. ENDPOINTS CRUD PARA CONTAS
    // ================================
    @GetMapping // GET /accounts -> retorna lista de contas
    public List<AccountDto> getAll() { // método que trata a listagem
        return service.findAll(); // delega ao serviço e retorna lista de DTOs
    }

    /**
     * Endpoint para buscar uma conta por ID. Retorna 200 OK com o DTO se encontrado, ou 404 Not Found se não existir.
     * GET /accounts/{id} -> retorna uma conta por id
     * @GetMapping("/{id}") mapeia para GET com id na URL
     * @ResponseEntity<AccountDto> permite retornar status HTTP adequado
     * @getById é o nome do método que trata a requisição(busca por id)
     * @return service.findById(id) retorna um Optional<AccountDto> do serviço
     * @.map(ResponseEntity::ok) se o Optional tiver valor, mapeia para ResponseEntity.ok(dto)
     * @.orElseGet(() -> ResponseEntity.notFound().build()) se o Optional
     * @estiver vazio, retorna ResponseEntity.notFound().build() que gera um 404 Not Found
     */
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
    @PostMapping("/transfer")
    public ResponseEntity<?> transfer(@RequestBody TransferRequest request) {

        service.transfer(request.getFromId(), request.getToId(), request.getAmount());

        return ResponseEntity.ok(Map.of(
            "message", "Transferência realizada",
            "fromId", request.getFromId(),
            "toId", request.getToId(),
            "amount", request.getAmount()
        ));
    }
    
} // fim da classe AccountController