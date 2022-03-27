package com.clevory.back.service.user.itf;

import com.clevory.back.model.user.Role;

import java.util.List;

public interface RoleService {

    List<Role> getRoles();
    List<Role> deleteRole(long id);
    Role getRoleById(long id);
    Role save(Role role);
    Role update(long id,Role role);
}
