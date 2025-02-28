package com.eCommerce.backend.controller;

import com.eCommerce.backend.Dto.*;
import com.eCommerce.backend.model.Role;
import com.eCommerce.backend.model.UserEntity;
import com.eCommerce.backend.repository.RoleRepository;
import com.eCommerce.backend.repository.UserRepository;
import com.eCommerce.backend.security.JwtTokenGenerator;
import com.nimbusds.openid.connect.sdk.claims.UserInfo;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.util.ReflectionUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Field;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
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

        Role role = roleRepository.findByName("ROLE_USER").get();
        user.setRole(role);

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

            Cookie cookie = new Cookie("token", token);
            cookie.setHttpOnly(true);
            cookie.setSecure(true);
            cookie.setPath("/");
//            cookie.setMaxAge();
            cookie.setDomain("localhost");

            response.addCookie(cookie);

            return new ResponseEntity<>("Login successful", HttpStatus.OK);
        } catch (BadCredentialsException e) {
            return new ResponseEntity<>("Invalid email or password", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/users")
    public ResponseEntity<UsersResponseDto> getAllUsers() {
        List<UserEntity> users = userRepository.findAll();
        List<UserInfoDto> userInfoDto = users.stream()
                    .map(user -> new UserInfoDto(user))
                .toList();
        return new ResponseEntity<>(
                new UsersResponseDto("Users retrieved successfully!", true, userInfoDto),
                HttpStatus.OK
        );
    }

    @GetMapping("/me")
    public ResponseEntity<?> getUserInfo(@CookieValue(name = "token", required = false) String token) {

        log.info(token);
        if (token == null || !tokenGenerator.validateToken(token)) {
            return new ResponseEntity<>("Invalid or missing token", HttpStatus.UNAUTHORIZED);
        }

        Claims claims = tokenGenerator.getClaimsFromToken(token);
        String email = claims.getSubject();

        UserEntity user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
        log.info(user.toString());

        UserInfoDto userInfo = new UserInfoDto(user);
        return new ResponseEntity<>(userInfo, HttpStatus.OK);
    }

    @DeleteMapping("/users/{userIds}")
    public ResponseEntity<String> deleteUser(@PathVariable Long[] userIds) {
        try{
            userRepository.deleteAllById(Arrays.asList(userIds));
            return new ResponseEntity<>("User successfully deleted!", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Unable to delete user", HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("/users/{userId}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<UserInfoDto> editUser(@PathVariable Long userId, @RequestBody EditUserDto editUserDto) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setUsername(editUserDto.getUsername());
        Role role = roleRepository.findByName(editUserDto.getRole())
                .orElseThrow(() -> new RuntimeException("Role not found"));
        user.setRole(role);


        
        return new ResponseEntity<>(new UserInfoDto(user), HttpStatus.OK);
    }

}
