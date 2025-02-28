package com.eCommerce.backend.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Base64;
import java.util.Date;
import java.util.List;

@Component
public class JwtTokenGenerator {


    private static final Logger logger = LoggerFactory.getLogger(JwtTokenGenerator.class);
    private final SecretKey key;

    public JwtTokenGenerator(@Value("${jwt.secret}") String secret) {
        byte[] decodedKey = Base64.getDecoder().decode(secret);
        this.key = Keys.hmacShaKeyFor(decodedKey);
    }

    public String generateToken(Authentication authentication) {
        String email = authentication.getName();
        Date currDate = new Date();

        String role = authentication.getAuthorities().stream()
                .findFirst() // Get first role (since it's a single role now)
                .map(GrantedAuthority::getAuthority)
                .orElse("ROLE_USER"); // Default role if none found

        Date expireDate = new Date(currDate.getTime() + SecurityConstants.JWT_EXPIRATION);

        return Jwts.builder()
                .setSubject(email)
                .claim("role", role)
                .setIssuedAt(currDate)
                .setExpiration(expireDate)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public Claims getClaimsFromToken(String token) {
        return Jwts.parser()
                .setSigningKey(key)
                .parseClaimsJws(token)
                .getBody();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(key).parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException ex) {
            logger.error("JWT token is expired: {}", ex.getMessage());
            throw new AuthenticationCredentialsNotFoundException("JWT token is expired");
        } catch (MalformedJwtException ex) {
            logger.error("Invalid JWT token format: {}", ex.getMessage());
            throw new AuthenticationCredentialsNotFoundException("Invalid JWT token format");
        } catch (Exception ex) {
            logger.error("Invalid JWT token: {}", ex.getMessage());
            throw new AuthenticationCredentialsNotFoundException("Invalid JWT token");
        }
    }
}
