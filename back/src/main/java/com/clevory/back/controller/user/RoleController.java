package com.clevory.back.controller.user;

import com.clevory.back.model.user.Role;
import com.clevory.back.service.user.itf.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/roles")
public class RoleController {

    private RoleService roleService;
    @Autowired
    public RoleController(RoleService roleService)
    {
        super();
        this.roleService = roleService;
    }

    @GetMapping
    public List<Role> getAll()
    {
        return roleService.getRoles();
    }

    @GetMapping("/{id}")
    public Role getById(@PathVariable long id)
    {
        return roleService.getRoleById(id);
    }

    @PostMapping
    public Role create (@RequestBody Role role) {return roleService.save(role);}

    @PutMapping("/{id}")
    public Role update (@PathVariable("id") long id, @RequestBody  Role role) {
        return roleService.update(id, role);
    }

    @DeleteMapping("/{id}")
    public List<Role> deleteById(@PathVariable("id") long id) {
        return roleService.deleteRole(id);
    }
}
