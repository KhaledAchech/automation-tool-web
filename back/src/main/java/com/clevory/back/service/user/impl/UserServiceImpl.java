package com.clevory.back.service.user.impl;

import com.clevory.back.model.user.User;
import com.clevory.back.repository.user.UserRepository;
import com.clevory.back.service.user.itf.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    @Override
    public List<User> getUsers()
    {
        return userRepository.findAll();
    }

    @Override
    public List<User> deleteUser(long id)
    {
        userRepository.deleteById(id);
        return userRepository.findAll();
    }

    @Override
    public User getUserById(long id)
    {
        return userRepository.getById(id);
    }

    @Override
    public User saveOrUpdate(User user) {
        userRepository.save(user);
        return user;
    }
}
