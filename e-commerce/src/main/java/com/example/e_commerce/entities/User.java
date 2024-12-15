package com.example.e_commerce.entities;

import com.example.e_commerce.dto.UserDTO;
import com.example.e_commerce.enums.UserRole;
import jakarta.persistence.*;
import lombok.Data;


@SuppressWarnings("ALL")
@Entity
@Data
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column( nullable = false)
    private String name;
    @Column(unique = true, nullable = false)
    private String email;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false)
    private UserRole userRole;
    @Column(nullable = true)
    private byte[] image;


}
