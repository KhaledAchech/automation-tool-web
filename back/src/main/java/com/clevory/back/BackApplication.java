package com.clevory.back;

import com.clevory.back.model.user.Role;
import com.clevory.back.model.user.User;
import com.clevory.back.service.user.impl.UserServiceImpl;
import com.clevory.back.service.user.itf.RoleService;
import com.clevory.back.service.user.itf.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;


@SpringBootApplication
public class BackApplication {

	public static void main(String[] args)
	{
		SpringApplication.run(BackApplication.class, args);
	}

	@Bean
	PasswordEncoder passwordEncoder()
	{
		return new BCryptPasswordEncoder();
	}

}
