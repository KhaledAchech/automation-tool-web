package com.clevory.back.service.user.itf;

import com.clevory.back.model.user.User;

import java.util.List;

public interface UserService {
    List<User> getUsers();
    List<User> deleteUser(long id);
    User getUserById(long id);
    User saveOrUpdate(User user);
}
