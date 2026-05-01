package com.citybank.api; // pacote base da aplicação

import org.springframework.boot.SpringApplication; 
import org.springframework.boot.autoconfigure.SpringBootApplication; 

@SpringBootApplication // Só isso basta! Ele escaneia entidades, repositórios e controllers automaticamente a partir deste pacote.
public class BankApiApplication { 

    public static void main(String[] args) { 
        SpringApplication.run(BankApiApplication.class, args); 
    } 

}