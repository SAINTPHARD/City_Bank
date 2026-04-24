package com.citybank.api; // pacote base da aplicação

import org.springframework.boot.SpringApplication; // utilitário que inicia a aplicação Spring Boot
import org.springframework.boot.autoconfigure.SpringBootApplication; // anotação que ativa autoconfiguração do Spring Boot
import org.springframework.boot.autoconfigure.domain.EntityScan; // para configurar scan de entidades JPA
import org.springframework.data.jpa.repository.config.EnableJpaRepositories; // para configurar scan de repositories JPA

@SpringBootApplication(scanBasePackages = {"com.citybank.api", "com.safewallet.bank"}) // configura a aplicação e define pacotes a serem escaneados pelo Spring
@EnableJpaRepositories(basePackages = "com.safewallet.bank.repository") // garante que interfaces de repository sejam encontradas
@EntityScan(basePackages = "com.safewallet.bank.entity") // garante que entidades JPA sejam encontradas
public class BankApiApplication { // classe principal que contém o método main

    public static void main(String[] args) { // ponto de entrada da aplicação Java
        SpringApplication.run(BankApiApplication.class, args); // inicia o contexto Spring e o servidor embutido
    } // fim do método main

} // fim da classe BankApiApplication