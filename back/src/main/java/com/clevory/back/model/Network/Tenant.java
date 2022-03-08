package com.clevory.back.model.Network;

import com.clevory.back.model.user.User;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Tenant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 50)
    private String name;

    //will be managed by :
    @ManyToOne
    private User user;

    //Have multiple topologies :
    @OneToMany(mappedBy = "tenant", cascade = CascadeType.REMOVE)
    List<Topology> Topologies = new ArrayList<>();
}
