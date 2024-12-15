package com.example.e_commerce;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;

@SuppressWarnings("ALL")
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
@EnableJpaRepositories(basePackages = "com.example.e_commerce.repository")
@SpringBootApplication
public class ECommerceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ECommerceApplication.class, args);
	}


}
