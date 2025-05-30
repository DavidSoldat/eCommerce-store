package com.eCommerce.backend.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthEntryPoint authEntryPoint;
    private final CorsConfigurationSource corsConfigurationSource;
    private final Oauth2SuccessHandler oauth2SuccessHandler;

    @Autowired
    public SecurityConfig(JwtAuthEntryPoint authEntryPoint, CustomUserDetailsService userDetailsService, CorsConfigurationSource corsConfigurationSource, Oauth2SuccessHandler oAuth2SuccessHandler) {
        this.authEntryPoint = authEntryPoint;
        this.corsConfigurationSource = corsConfigurationSource;
        this.oauth2SuccessHandler = oAuth2SuccessHandler;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(corsConfigurationSource))
                .exceptionHandling(ex -> ex.authenticationEntryPoint(authEntryPoint))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/products", "/api/auth/login", "/api/auth/register", "/api/auth/oauth2/**", "/api/auth/me").permitAll()
                        .requestMatchers("/api/auth/logout", "/api/auth/users/me", "/api/cart/**").authenticated()
                        .requestMatchers("/api/auth/users", "/api/auth/users/**", "/api/categories", "/api/brands/edit").hasRole("ADMIN")
                        .anyRequest().authenticated()
                )
                .oauth2Login(oauth2 -> oauth2
                        .loginPage("/api/auth/loginGoogle")
                        .authorizationEndpoint(auth -> auth.baseUri("/api/auth/oauth2/authorization"))
                        .redirectionEndpoint(redir -> redir.baseUri("/api/auth/oauth2/code/*"))
                        .successHandler(oauth2SuccessHandler)
                )
               .httpBasic(Customizer.withDefaults());

        http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public JWTAuthenticationFilter jwtAuthenticationFilter() {
        return new JWTAuthenticationFilter();
    }
}
