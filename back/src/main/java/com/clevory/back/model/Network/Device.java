package com.clevory.back.model.network;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "DEVICE")
@Getter @Setter
public class Device {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 50)
    private String name;

    @Column(length = 50)
    private String os;

    private String status;

    //Have :
    @OneToOne
    private Configuration configuration;

//    //will be managed by :
//    @ManyToOne
//    private User user;

    //Belongs to :
    @JsonIgnore
    @ManyToMany(mappedBy = "topologyDevices")
    Set<Topology> topologies;

    //Have :
    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "device_interface",
            joinColumns = @JoinColumn(name = "device_id"),
            inverseJoinColumns = @JoinColumn(name = "interface_id"))
    Set<Interface> deviceInterfaces;

    //Run on:
    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "device_protocols",
            joinColumns = @JoinColumn(name = "device_id"),
            inverseJoinColumns = @JoinColumn(name = "protocol_id"))
    Set<Protocol> deviceProtocols;

}
