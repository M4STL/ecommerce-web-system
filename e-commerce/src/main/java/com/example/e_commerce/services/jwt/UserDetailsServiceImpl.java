package com.example.e_commerce.services.jwt;

import com.example.e_commerce.entities.User;
import com.example.e_commerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@SuppressWarnings("SuspiciousIndentAfterControlStatement")
@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserRepository userRepository;

    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findFirstByEmail(username);
        if (user == null) throw new UsernameNotFoundException("Username not found",null) ;
            return new org.springframework.security.core.userdetails
                    .User(user.getEmail(),user.getPassword(),new ArrayList<>());
        }

    }

