package com.eCommerce.backend.controller;

import com.eCommerce.backend.Dto.*;
import com.eCommerce.backend.model.Role;
import com.eCommerce.backend.model.UserEntity;
import com.eCommerce.backend.repository.RoleRepository;
import com.eCommerce.backend.repository.UserRepository;
import com.eCommerce.backend.security.JwtTokenGenerator;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
    public ResponseEntity<String> login(@RequestBody LoginDto loginDto, HttpServletResponse response) {
        try {
            Authentication authentication;
            if (loginDto.getPassword() == null || loginDto.getPassword().isEmpty()) {
                authentication = new UsernamePasswordAuthenticationToken(loginDto.getEmail(), null);
            } else {
                authentication = authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword())
                );
            }

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = tokenGenerator.generateToken(authentication);

            // Store JWT in cookie
            Cookie cookie = new Cookie("token", token);
            cookie.setHttpOnly(true);
            cookie.setSecure(true);
            cookie.setPath("/");
            cookie.setDomain("localhost");

            response.addCookie(cookie);

            return new ResponseEntity<>("Login successful", HttpStatus.OK);
        } catch (BadCredentialsException e) {
            return new ResponseEntity<>("Invalid email or password", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/users")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<UsersResponseDto> getAllUsers() {
        List<UserEntity> users = userRepository.findAll();
        List<UserInfoDto> userInfoDtos = users.stream()
                .map(user -> new UserInfoDto(user.getId(),user.getEmail(), user.getUsername(), user.getRoles()))
                .toList();
        return new ResponseEntity<>(
                new UsersResponseDto("Users retrieved successfully!", true, userInfoDtos),
                HttpStatus.OK
        );
    }

    @GetMapping("/me")
    public ResponseEntity<?> getUserInfo(@CookieValue(name = "token", required = false) String token) {
        if (token == null || !tokenGenerator.validateToken(token)) {
            return new ResponseEntity<>("Invalid or missing token", HttpStatus.UNAUTHORIZED);
        }

        Claims claims = tokenGenerator.getClaimsFromToken(token);
        String email = claims.getSubject();

        UserEntity user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }

        UserInfoDto userInfo = new UserInfoDto(user.getId(), user.getEmail(), user.getUsername(), user.getRoles());

        return new ResponseEntity<>(userInfo, HttpStatus.OK);
    }


    @GetMapping("/oauth2/callback")
    public ResponseEntity<String> oauth2Callback(@AuthenticationPrincipal OAuth2User oauthUser, HttpServletResponse response) {
        if (oauthUser == null) {
            return new ResponseEntity<>("OAuth2 authentication failed", HttpStatus.UNAUTHORIZED);
        }

        String email = oauthUser.getAttribute("email");
        String username = oauthUser.getAttribute("name");

        UserEntity user = userRepository.findByEmail(email).orElse(null);

        if (user == null) {
            // Register new user
            user = new UserEntity();
            user.setEmail(email);
            user.setUsername(username);
            user.setPassword(""); // No password needed for OAuth users

            Role userRole = roleRepository.findByName("ROLE_USER").orElseThrow();
            user.setRoles(Collections.singletonList(userRole));

            userRepository.save(user);
        }

        Authentication authentication = new UsernamePasswordAuthenticationToken(user.getRoles(), user, null);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = tokenGenerator.generateToken(authentication);

        Cookie cookie = new Cookie("token", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setDomain("localhost");

        response.addCookie(cookie);

        return new ResponseEntity<>("OAuth2 Login successful", HttpStatus.OK);
    }

}
