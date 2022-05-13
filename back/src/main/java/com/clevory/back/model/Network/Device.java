package com.clevory.back.model.network;

import com.clevory.back.commun.Type;
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
    private String ipAddress;

    //default logins for all the devices are clevory/clevory
    @Column(length = 50)
    private String username = "clevory";
    @Column(length = 50)
    private String password = "clevory";

    @Enumerated(EnumType.STRING)
    private Type type;

    @Column(length = 50)
    private String hostname;

    @Column(length = 50)
    private String os;

    @Column(length = 50)
    private String vendor;

    private String status;

    private boolean isAssigned; // => isAssigned attribute will help us determine if this device is added to a topology or not.

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
