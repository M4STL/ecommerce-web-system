package com.example.e_commerce.services.user;

import com.example.e_commerce.dto.SignupDTO;
import com.example.e_commerce.dto.UserDTO;
import com.example.e_commerce.entities.Order;
import com.example.e_commerce.entities.User;
import com.example.e_commerce.enums.OrderStatus;
import com.example.e_commerce.enums.UserRole;
import com.example.e_commerce.repository.OrderRepository;
import com.example.e_commerce.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderRepository orderRepository;

    @PostConstruct
    public  void createAdminAccount() {
        User adminAccount = userRepository.findByUserRole(UserRole.ADMIN);
        if (adminAccount == null) {
            User user = new User();
            user.setUserRole(UserRole.ADMIN);
            user.setEmail("admin@test.com");
            user.setName("admin");
            user.setPassword(new BCryptPasswordEncoder().encode("admin"));
            userRepository.save(user);
            System.out.println("Admin account created successfully.");
        } else {
            System.out.println("Admin account already exists.");
        }
    }
    @Override
    public UserDTO createdUser(SignupDTO signupDTO) {
        User user = new User();
        user.setName(signupDTO.getName());
        user.setEmail(signupDTO.getEmail());
        user.setUserRole(UserRole.USER);
        user.setPassword(new BCryptPasswordEncoder().encode(signupDTO.getPassword()));
        User createdUser = userRepository.save(user);

        Order order = new Order();
        order.setPrice(0L);
        order.setOrderStatus(OrderStatus.PENDING);
        order.setUser(createdUser);
        orderRepository.save(order);

        UserDTO userDTO = new UserDTO();
        userDTO.setId(createdUser.getId());
        userDTO.setName(createdUser.getName());
        userDTO.setEmail(createdUser.getEmail());
        userDTO.setUserRole(createdUser.getUserRole());
        return userDTO;
    }

    @Override
    public boolean hasUserWithEmail(String email) {
        return userRepository.findFirstByEmail(email)!=null;
    }
}
