package com.example.e_commerce.dto;

import com.example.e_commerce.enums.UserRole;
import lombok.Data;

@Data
public class UserDTO {
    private long id;
    private String name;
    private String email;
    private String password;
    private UserRole userRole;


}
