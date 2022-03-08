package com.clevory.back.model.Network;

import com.clevory.back.model.user.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

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

    //Belongs to :
    @ManyToMany(mappedBy = "topologyDevices")
    Set<Topology> topologies;

    //Have :
    @ManyToMany
    @JoinTable(
            name = "device_interface",
            joinColumns = @JoinColumn(name = "device_id"),
            inverseJoinColumns = @JoinColumn(name = "interface_id"))
    Set<Interface> deviceInterfaces;

    //Run on:
    @ManyToMany
    @JoinTable(
            name = "device_protocols",
            joinColumns = @JoinColumn(name = "device_id"),
            inverseJoinColumns = @JoinColumn(name = "protocol_id"))
    Set<Interface> deviceProtocols;

}
