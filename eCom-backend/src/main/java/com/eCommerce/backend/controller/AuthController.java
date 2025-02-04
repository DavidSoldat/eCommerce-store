package com.eCommerce.backend.controller;

import com.eCommerce.backend.Dto.*;
import com.eCommerce.backend.model.Role;
import com.eCommerce.backend.model.UserEntity;
import com.eCommerce.backend.repository.RoleRepository;
import com.eCommerce.backend.repository.UserRepository;
import com.eCommerce.backend.security.JwtTokenGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenGenerator tokenGenerator;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, UserRepository userRepository,
                          RoleRepository roleRepository, PasswordEncoder passwordEncoder, JwtTokenGenerator tokenGenerator) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenGenerator = tokenGenerator;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@Validated @RequestBody RegisterDto registerDto) {
        if(userRepository.existsByEmail(registerDto.getEmail())) {
            return new ResponseEntity<>("User with this email already exists!", HttpStatus.BAD_REQUEST);
        }
        if(!registerDto.getPassword().equals(registerDto.getConfirmPassword())) {
            return new ResponseEntity<>("Passwords do not match", HttpStatus.BAD_REQUEST);
        }
        UserEntity user = new UserEntity();
        String email = registerDto.getEmail();
        String username = email.split("@")[0];
        user.setEmail(email);
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));

        Role roles = roleRepository.findByName("ROLE_USER").get();
        user.setRoles(Collections.singletonList(roles));

        userRepository.save(user);

        return new ResponseEntity<>("User registered successfully!", HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(@RequestBody LoginDto loginDto) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword())
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = tokenGenerator.generateToken(authentication);
            return new ResponseEntity<>(new AuthResponseDto(token), HttpStatus.OK);
        } catch (BadCredentialsException e) {
            return new ResponseEntity<>(new AuthResponseDto("Invalid email or password"),
                    HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/users")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<UsersResponseDto> getAllUsers() {
        List<UserEntity> users = userRepository.findAll();
        List<UserInfoDto> userInfoDtos = users.stream()
                .map(user -> new UserInfoDto(user.getEmail(), user.getUsername()))
                .toList();
        return new ResponseEntity<>(
                new UsersResponseDto("Users retrieved successfully!", true, userInfoDtos),
                HttpStatus.OK
        );
    }
}
