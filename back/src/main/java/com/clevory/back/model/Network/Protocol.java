package com.clevory.back.model.Network;

import com.clevory.back.model.user.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter @Setter
public class Protocol {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String type;
    private String configuration;

    //will be managed by :
    @ManyToOne
    private User user;

    //run :
    @ManyToMany(mappedBy = "deviceProtocols")
    Set<Device> devices;
}
