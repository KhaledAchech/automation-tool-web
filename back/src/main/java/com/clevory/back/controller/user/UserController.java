package com.clevory.back.controller.user;

import com.clevory.back.model.user.User;
import com.clevory.back.service.user.itf.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService)
    {
        super();
        this.userService = userService;
    }
    @GetMapping
    public List<User> getAll()
    {
        return userService.getUsers();
    }

    @GetMapping("/{id}")
    public User getById(@PathVariable long id)
    {
        return userService.getUserById(id);
    }

    @PostMapping
    public User createOrUpdate (@RequestBody User user) {return userService.saveOrUpdate(user);}

    @DeleteMapping("/{id}")
    public List<User> deleteById(@PathVariable("id") long id) {
        return userService.deleteUser(id);
    }
}
