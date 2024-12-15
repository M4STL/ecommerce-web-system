package com.example.e_commerce.repository;

import com.example.e_commerce.entities.User;
import com.example.e_commerce.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findFirstByEmail(String email);


    User findByUserRole(UserRole admin);
}
