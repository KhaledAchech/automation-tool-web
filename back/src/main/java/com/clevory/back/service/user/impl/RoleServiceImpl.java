package com.clevory.back.service.user.impl;

import com.clevory.back.model.user.Role;
import com.clevory.back.repository.user.RoleRepository;
import com.clevory.back.service.user.itf.RoleService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class RoleServiceImpl implements RoleService {

    private RoleRepository roleRepository;

    @Override
    public List<Role> getRoles()
    {
        return roleRepository.findAll();
    }

    @Override
    public List<Role> deleteRole(long id)
    {
        roleRepository.deleteById(id);
        return roleRepository.findAll();
    }

    @Override
    public Role getRoleById(long id)
    {
        return roleRepository.findById(id).get();
    }

    @Override
    public Role save(Role role) {
        roleRepository.save(role);
        return role;
    }

    @Override
    public Role update(long id, Role role) {
        Role thisRole = this.getRoleById(id);
        thisRole.setName(role.getName());

        roleRepository.save(thisRole);
        return thisRole;
    }

}
