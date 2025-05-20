package com.eCommerce.backend.security;

import com.eCommerce.backend.model.Cart;
import com.eCommerce.backend.model.Role;
import com.eCommerce.backend.model.UserEntity;
import com.eCommerce.backend.repository.RoleRepository;
import com.eCommerce.backend.repository.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class Oauth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtTokenGenerator jwtTokenGenerator;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public Oauth2SuccessHandler(JwtTokenGenerator jwtTokenGenerator, UserRepository userRepository, RoleRepository roleRepository) {
        this.jwtTokenGenerator = jwtTokenGenerator;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        OAuth2AuthenticationToken oAuth2Token = (OAuth2AuthenticationToken) authentication;
        OAuth2User principal = oAuth2Token.getPrincipal();
        Map<String, Object> attributes = principal.getAttributes();
        String email = (String) attributes.get("email");
        if (email == null) {
            throw new AuthenticationCredentialsNotFoundException("Email not found in Oauth2 user attributes");
        }
        String name = (String) attributes.get("name");
        String givenName = (String) attributes.get("given_name");
        String familyName = (String) attributes.get("family_name");

        String username = name;
        if (username == null || username.trim().isEmpty()) {
            username = (givenName != null ? givenName : "") + " " + (familyName != null ? familyName : "");
        }
        if (username.trim().isEmpty()) {
            username = email.split("@")[0];
        }

        Optional<UserEntity> userOptional = userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            UserEntity newUser = new UserEntity();
            newUser.setEmail(email);
            newUser.setUsername(username);
            Role role = roleRepository.findByName("ROLE_USER").get();
            newUser.setRole(role);
            Cart cart = new Cart();
            newUser.setCart(cart);
            cart.setUser(newUser);

            userRepository.save(newUser);
        }

        UserEntity user = userRepository.findByEmail(email).get();
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(user.getRole().getName());

        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                email, null, List.of(authority)
        );

        String jwt = jwtTokenGenerator.generateToken(authToken);

        Cookie cookie = new Cookie("token", jwt);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(SecurityConstants.TOKEN_MAXAGE);
        cookie.setDomain("localhost");

        response.addCookie(cookie);

        getRedirectStrategy().sendRedirect(request, response, "http://localhost:5173/oauth-callback");

    }
}