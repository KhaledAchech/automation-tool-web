package com.clevory.back.controller.user;

import com.clevory.back.commun.wrapper.RoleToUserForm;
import com.clevory.back.commun.wrapper.UserResonseWrapper;
import com.clevory.back.commun.wrapper.UserWithRoles;
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
    public List<UserResonseWrapper> getAll()
    {
        List<User> users = userService.getUsers();
        List<UserResonseWrapper> userResonses = new ArrayList<>();
        for (User u: users)
        {
            if (u.getRoles().size() == 3 )
            {
                userResonses.add(new UserResonseWrapper(u.getId(),u.getUsername(),"CTNAS Admin"));
            }
            if (u.getRoles().size() == 2)
            {
                userResonses.add(new UserResonseWrapper(u.getId(),u.getUsername(),"Tenant Admin"));
            }
            if (u.getRoles().size() == 1)
            {
                userResonses.add(new UserResonseWrapper(u.getId(),u.getUsername(),"Moderator"));
            }
        }
        return userResonses;
    }

    @GetMapping("/moderators")
    public List<UserResonseWrapper> getModerators()
    {
        List<User> users = userService.getModerators();
        List<UserResonseWrapper> userResonses = new ArrayList<>();
        for (User u: users)
        {
            userResonses.add(new UserResonseWrapper(u.getId(),u.getUsername(),"Moderator"));
        }
        return userResonses;
    }

    @GetMapping("/tenantAdmins")
    public List<User> getTenantAdmins()
    {
        return userService.getTenantAdmins();
    }

    @GetMapping("/{id}")
    public User getById(@PathVariable long id)
    {
        return userService.getUserById(id);
    }

    @GetMapping("/{username}")
    public User getbyUsername(@PathVariable String username)
    {
        return userService.getUserByUsername(username);
    }

    @PostMapping
    public User create (@RequestBody User user) {return userService.save(user);}

    @PostMapping("/addRoleToUser")
    public ResponseEntity<?> addRoleToUser (@RequestBody RoleToUserForm roleToUserForm)
    {
        userService.addRoleToUser(roleToUserForm.getUsername(), roleToUserForm.getRolename());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/createUserWithRoles")
    public User createWithRoles (@RequestBody UserWithRoles userWithRoles)
    {
        User newUser = new User();
        newUser.setUsername(userWithRoles.getUsername());
        newUser.setPassword(userWithRoles.getPassword());
        return userService.addUserWithRoles(newUser, userWithRoles.getRolename());
    }


    @PutMapping("/{id}")
    public User update (@PathVariable("id") long id, @RequestBody  User user) {
        return userService.update(id, user);
    }

    @PutMapping
    public User updateUserRoles(@RequestBody RoleToUserForm roleToUserForm)
    {
        return userService.updateUserRoles(roleToUserForm.getUsername(), roleToUserForm.getRolename());
    }


    @DeleteMapping("/{id}")
    public List<User> deleteById(@PathVariable("id") long id) {
        return userService.deleteUser(id);
    }
}
