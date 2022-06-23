package com.clevory.back.controller.user;

import com.clevory.back.model.user.User;
import com.clevory.back.service.user.itf.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private UserService userService;

    @Autowired
    public ProfileController(UserService userService)
    {
        super();
        this.userService = userService;
    }

    @PutMapping("/{id}")
    public User update (@PathVariable("id") long id, @RequestBody  User user) {
        return userService.update(id, user);
    }

    @GetMapping("/{username}")
    public User getbyUsername(@PathVariable String username)
    {
        return userService.getUserByUsername(username);
    }
}
