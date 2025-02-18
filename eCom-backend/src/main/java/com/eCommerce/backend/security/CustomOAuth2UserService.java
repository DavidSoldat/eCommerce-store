package com.eCommerce.backend.security;

import com.eCommerce.backend.model.Role;
import com.eCommerce.backend.model.UserEntity;
import com.eCommerce.backend.repository.RoleRepository;
import com.eCommerce.backend.repository.UserRepository;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Collections;
import java.util.Map;
import java.util.Optional;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public CustomOAuth2UserService(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    @Transactional
    public OAuth2User loadUser(OAuth2UserRequest userRequest) {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        Map<String, Object> attributes = oAuth2User.getAttributes();

        String email = (String) attributes.get("email");
        String username = (String) attributes.get("name");

        Optional<UserEntity> existingUser = userRepository.findByEmail(email);

        if (existingUser.isEmpty()) {
            // Assign default role if user is new
            Role defaultRole = roleRepository.findByName("ROLE_USER")
                    .orElseThrow(() -> new RuntimeException("Default role not found"));

            UserEntity newUser = new UserEntity();
            newUser.setUsername(username);
            newUser.setEmail(email);
            newUser.setPassword(null); // No password needed for OAuth users
            newUser.setRoles(Collections.singletonList(defaultRole)); // Assign a role

            userRepository.save(newUser);
        }

        return oAuth2User;
    }
}
