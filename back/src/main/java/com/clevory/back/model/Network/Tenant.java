package com.clevory.back.model.Network;

import com.clevory.back.model.user.User;

import javax.persistence.*;

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
}
