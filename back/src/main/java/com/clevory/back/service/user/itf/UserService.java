package com.clevory.back.service.user.itf;

import com.clevory.back.model.user.Role;
import com.clevory.back.model.user.User;

import java.util.List;

public interface UserService {
    List<User> getUsers();
    List<User> deleteUser(long id);
    User getUserById(long id);
    User save(User user);
    User update(long id,User user);

    void addRoleToUser(String username, String roleName);
    User getUserByUsername(String username);

    List<User> getModerators();
    List<User> getTenantAdmins();

    User addUserWithRoles(User user, String rolename);
    User updateUserRoles(String username, String rolename);

}
