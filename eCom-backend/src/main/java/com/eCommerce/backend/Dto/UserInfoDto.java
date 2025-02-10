package com.eCommerce.backend.Dto;

import com.eCommerce.backend.model.Role;
import com.eCommerce.backend.model.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Optional;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoDto {
    private Long id;
    private String username;
    private String email;
    private List<Role> roles;

    public UserInfoDto(Optional<UserEntity> user) {
        this.id = user.get().getId();
        this.username = user.get().getUsername();
        this.email = user.get().getEmail();
        this.roles = user.get().getRoles();
    }
}
