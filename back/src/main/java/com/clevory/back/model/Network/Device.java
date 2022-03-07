package com.clevory.back.model.Network;

import com.clevory.back.model.user.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
public class Device {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 50)
    private String name;

    @Column(length = 50)
    private String ios;

    //Have :
    @OneToOne
    private Configuration configuration;

    //will be managed by :
    @ManyToOne
    private User user;
}
