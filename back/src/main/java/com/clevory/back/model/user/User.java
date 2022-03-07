package com.clevory.back.model.user;

import com.clevory.back.model.Network.*;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 50)
    private String username;

    @Column(length = 50)
    private String password;

    //The user will get his authority from this relationship
    @OneToOne
    private Role role;

    //User will manage all of the below :
    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    List<Tenant> Tenants = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    List<Topology> Topologies = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    List<Device> Devices = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    List<Protocol> Protocols = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    List<Interface> Interfaces = new ArrayList<>();
}
