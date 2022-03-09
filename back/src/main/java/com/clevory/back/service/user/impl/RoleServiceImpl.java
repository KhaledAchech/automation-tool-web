package com.clevory.back.service.user.impl;

import com.clevory.back.model.user.Role;
import com.clevory.back.repository.user.RoleRepository;
import com.clevory.back.service.user.itf.RoleService;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class RoleServiceImpl implements RoleService {

    private RoleRepository roleRepository;

    @Override
    public List<Role> getRoles() {
        return null;
    }

    @Override
    public List<Role> deleteRole(long id) {
        return null;
    }

    @Override
    public Role getRoleById(long id) {
        return null;
    }

    @Override
    public Role saveOrUpdate(Role role) {
        return null;
    }
}
