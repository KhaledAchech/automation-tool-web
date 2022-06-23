package com.clevory.back.service.user.impl;

import com.clevory.back.model.user.Role;
import com.clevory.back.model.user.User;
import com.clevory.back.repository.image.ImageRepository;
import com.clevory.back.repository.user.RoleRepository;
import com.clevory.back.repository.user.UserRepository;
import com.clevory.back.service.image.itf.ImageService;
import com.clevory.back.service.user.itf.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Transactional
public class UserServiceImpl implements UserService, UserDetailsService {

    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private ImageService imageService;
    private final PasswordEncoder passwordEncoder;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null)
        {
            throw new UsernameNotFoundException("User not found in the database");
        }

        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();

        user.getRoles().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority(role.getName()));
        });

        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), authorities);
    }

    @Override
    public List<User> getUsers()
    {
        return userRepository.findAll();
    }

    @Override
    public List<User> deleteUser(long id)
    {
        User user = userRepository.findById(id).get();
        user.setRoles(new ArrayList<>());
        imageService.deleteUserImages(user);
        userRepository.save(user);
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
        {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            return userRepository.save(user);
        }

        return null;
    }

    @Override
    public User update(long id, User user) {

        /*if (user.getUsername()!=null && user.getPassword()!=null)
        {
            User thisUser = this.getUserById(id);
            thisUser.setUsername(user.getUsername());
            thisUser.setPassword(user.getPassword());

            return userRepository.save(thisUser);
        }*/

        User thisUser = this.getUserById(id);
        if (thisUser !=null)
        {
            if (user.getUsername()!=null)
                thisUser.setUsername(user.getUsername());
            if (user.getPassword()!=null)
                thisUser.setPassword(passwordEncoder.encode(user.getPassword()));
            if (user.getFirstname()!=null)
                thisUser.setFirstname(user.getFirstname());
            if (user.getLastname()!=null)
                thisUser.setLastname(user.getLastname());

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

    @Override
    public List<User> getModerators() {
        List<User> moderators = userRepository.findAll()
                .stream()
                .filter(r -> r.getRoles().size() == 1)
                .collect(Collectors.toList());
        return moderators;
    }

    @Override
    public List<User> getTenantAdmins() {
        List<User> tenantAdmins = userRepository.findAll()
                .stream()
                .filter(r -> r.getRoles().size() == 2)
                .collect(Collectors.toList());
        return tenantAdmins;
    }

    @Override
    public User addUserWithRoles(User user, String rolename) {
        if (userRepository.findByUsername(user.getUsername())!=null)
            return null;

        if (user.getUsername()!=null && user.getPassword()!=null)
        {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            Role role = roleRepository.findByName(rolename);
            if (rolename.equals("ROLE_CTNAS_ADMIN"))
            {
                user.getRoles().add(role);
                user.getRoles().add(roleRepository.findById(2L).get());
                user.getRoles().add(roleRepository.findById(3L).get());
            }
            if (rolename.equals("ROLE_TENANT_ADMIN"))
            {
                user.getRoles().add(role);
                user.getRoles().add(roleRepository.findById(3L).get());
            }
            if (rolename.equals("ROLE_MODERATOR"))
            {
                user.getRoles().add(role);
            }
            return userRepository.save(user);
        }

        return null;
    }

    @Override
    public User updateUserRoles(String username, String rolename) {

        User user = userRepository.findByUsername(username);
        Role role = roleRepository.findByName(rolename);

        //initialise user roles
        user.setRoles(new ArrayList<>());

        //add the updated roles
        if (rolename.equals("ROLE_CTNAS_ADMIN"))
        {
            user.getRoles().add(role);
            user.getRoles().add(roleRepository.findById(2L).get());
            user.getRoles().add(roleRepository.findById(3L).get());
        }
        if (rolename.equals("ROLE_TENANT_ADMIN"))
        {
            user.getRoles().add(role);
            user.getRoles().add(roleRepository.findById(3L).get());
        }
        if (rolename.equals("ROLE_MODERATOR"))
        {
            user.getRoles().add(role);
        }
        return userRepository.save(user);
    }

}
