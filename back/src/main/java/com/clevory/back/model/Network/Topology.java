package com.clevory.back.model.network;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter @Setter
public class Topology {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 50)
    private String name;

    @Column(length = 50)
    private String type;

//    //will be managed by :
//    @ManyToOne
//    private User user;

    //Belongs to :
    @ManyToOne
    private Tenant tenant;

    //Have :
    @ManyToMany
    @JoinTable(
            name = "topology_device",
            joinColumns = @JoinColumn(name = "topology_id"),
            inverseJoinColumns = @JoinColumn(name = "device_id"))
    Set<Device> topologyDevices;
}
