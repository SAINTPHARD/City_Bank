package com.citybank.api.controller;

import com.citybank.api.domain.usuario.Usuario;
import com.citybank.api.domain.usuario.UsuarioRepository;
import com.citybank.api.domain.usuario.dto.DadosAutenticacao;
import com.citybank.api.domain.usuario.dto.DadosRegistroUsuario;
import com.citybank.api.domain.usuario.dto.DadosTokenJWT;
import com.citybank.api.infra.security.TokenService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AutenticacaoController {

    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public AutenticacaoController(
            AuthenticationManager authenticationManager,
            TokenService tokenService,
            UsuarioRepository usuarioRepository,
            PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<DadosTokenJWT> login(@RequestBody @Valid DadosAutenticacao dados) {
        try {
            UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(dados.getEmail(), dados.getPassword());
            Authentication authentication = authenticationManager.authenticate(authToken);
            String jwt = tokenService.generateToken(authentication);

            return ResponseEntity.ok(new DadosTokenJWT(jwt));
        } catch (AuthenticationException ex) {
            return ResponseEntity.status(401).build();
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Void> registrar(@RequestBody @Valid DadosRegistroUsuario dados) {
        if (usuarioRepository.existsByLogin(dados.getEmail())) {
            return ResponseEntity.badRequest().build();
        }

        Usuario usuario = new Usuario();
        usuario.setLogin(dados.getEmail());
        usuario.setSenha(passwordEncoder.encode(dados.getPassword()));
        usuarioRepository.save(usuario);

        return ResponseEntity.ok().build();
    }
}
