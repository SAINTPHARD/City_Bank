package com.citybank.api.service;

import com.citybank.api.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AutenticacaoService implements UserDetailsService {

    @Autowired
    private UsuarioRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Aqui você busca o usuário no seu banco pelo login/email
        UserDetails user = repository.findByLogin(username);
        
        if (user == null) {
            throw new UsernameNotFoundException("Usuário não encontrado");
        }
        
        return user;
    }
}
