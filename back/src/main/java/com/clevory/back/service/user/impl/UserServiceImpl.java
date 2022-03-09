package com.clevory.back.service.user.impl;

import com.clevory.back.model.user.User;
import com.clevory.back.repository.user.UserRepository;
import com.clevory.back.service.user.itf.UserService;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    @Override
    public List<User> getUsers() {
        return null;
    }

    @Override
    public List<User> deleteUser(long id) {
        return null;
    }

    @Override
    public User getUserById(long id) {
        return null;
    }

    @Override
    public User saveOrUpdate(User user) {
        return null;
    }
}
