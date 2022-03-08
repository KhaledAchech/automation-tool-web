package com.clevory.back.model.Network;

import com.clevory.back.model.user.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter @Setter
public class Interface {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String ipAddress;
    private String type;
    private String speed;
    private String state;

    //will be managed by :
    @ManyToOne
    private User user;

    //Belongs to :
    @ManyToMany(mappedBy = "deviceInterfaces")
    Set<Device> devices;

    //Use :
    @Column(nullable = true)
    @OneToOne
    private Protocol protocol;
}
