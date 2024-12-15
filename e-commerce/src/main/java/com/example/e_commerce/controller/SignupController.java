package com.example.e_commerce.controller;

import com.example.e_commerce.dto.SignupDTO;
import com.example.e_commerce.dto.UserDTO;
import com.example.e_commerce.services.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SignupController {
    @Autowired
    private UserService userService;

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/signup")
     public ResponseEntity<?> signupUser(@RequestBody SignupDTO signupDTO){
        if (userService.hasUserWithEmail(signupDTO.getEmail())){
            return new ResponseEntity<>("Email already exists", HttpStatus.NOT_ACCEPTABLE);
        }
         UserDTO createdUser = userService.createdUser(signupDTO);
         if(createdUser == null){
             return new ResponseEntity<>("User not created. Come again later!", HttpStatus.BAD_REQUEST);
         }
         return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
     }
}
