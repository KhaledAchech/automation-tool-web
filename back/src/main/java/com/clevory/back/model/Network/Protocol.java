package com.clevory.back.model.network;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "PROTOCOL")
@Getter @Setter
public class Protocol {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String type;
    private String configuration;

//    //will be managed by :
//    @ManyToOne
//    private User user;

    //run :
    @JsonIgnore
    @ManyToMany(mappedBy = "deviceProtocols")
    Set<Device> devices;
}
