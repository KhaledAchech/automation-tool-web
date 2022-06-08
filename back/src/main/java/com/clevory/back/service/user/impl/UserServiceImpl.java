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

        if (userRepository.findByUsername(user.getUsername())!=null)
            return null;

        if (user.getUsername()!=null && user.getPassword()!=null)
            return userRepository.save(user);

        return null;
    }

    @Override
    public User update(long id, User user) {

        if (user.getUsername()!=null && user.getPassword()!=null)
        {
            User thisUser = this.getUserById(id);
            thisUser.setUsername(user.getUsername());
            thisUser.setPassword(user.getPassword());

            return userRepository.save(thisUser);
        }

        return null;
    }


    @Override
    public void addRoleToUser(String username, String roleName) {
        User user = userRepository.findByUsername(username);
        Role role = roleRepository.findByName(roleName);
        user.getRoles().add(role);
    }

    @Override
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
