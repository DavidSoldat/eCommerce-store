package com.eCommerce.backend.security;

import com.eCommerce.backend.model.Role;
import com.eCommerce.backend.model.UserEntity;
import com.eCommerce.backend.repository.UserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity user = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User with this email not found"));
        return new User(user.getEmail(), user.getPassword(), Collections.singleton(mapRoleToAuthority(user.getRole())));
    }

    private GrantedAuthority mapRoleToAuthority(Role role) {
        return new SimpleGrantedAuthority(
                role.getName().startsWith("ROLE_") ? role.getName() : "ROLE_" + role.getName()
        );
    }

}
