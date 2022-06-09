package com.clevory.back.controller.user;

import com.clevory.back.commun.wrapper.RoleToUserForm;
import com.clevory.back.model.user.User;
import com.clevory.back.service.user.itf.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@Slf4j
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
    public User create (@RequestBody User user) {return userService.save(user);}

    @PostMapping("/addRoleToUser")
    public ResponseEntity<?> addRoleToUser (@RequestBody RoleToUserForm roleToUserForm)
    {
        userService.addRoleToUser(roleToUserForm.getUsername(), roleToUserForm.getRolename());
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public User update (@PathVariable("id") long id, @RequestBody  User user) {
        return userService.update(id, user);
    }

    @DeleteMapping("/{id}")
    public List<User> deleteById(@PathVariable("id") long id) {
        return userService.deleteUser(id);
    }
}
