package com.clevory.back.model.network;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "TOPOLOGY")
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
    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "topology_device",
            joinColumns = @JoinColumn(name = "topology_id"),
            inverseJoinColumns = @JoinColumn(name = "device_id"))
    Set<Device> topologyDevices;
}
