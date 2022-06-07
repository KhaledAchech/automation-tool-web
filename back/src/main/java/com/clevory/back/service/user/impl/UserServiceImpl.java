package com.clevory.back.service.user.impl;

import com.clevory.back.model.user.Role;
import com.clevory.back.model.user.User;
import com.clevory.back.repository.user.RoleRepository;
import com.clevory.back.repository.user.UserRepository;
import com.clevory.back.service.user.itf.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@AllArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
    private RoleRepository roleRepository;

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
        return userRepository.findById(id).get();
    }

    @Override
    public User save(User user) {
        userRepository.save(user);
        return user;
    }

    @Override
    public User update(long id, User user) {
        User thisUser = this.getUserById(id);
        thisUser.setUsername(user.getUsername());
        thisUser.setPassword(user.getPassword());

        userRepository.save(thisUser);
        return thisUser;
    }


    @Override
    public void addRoleToUser(String username, String roleName) {

    }

    @Override
    public User getUserByUsername(String username) {
        return null;
    }
}
