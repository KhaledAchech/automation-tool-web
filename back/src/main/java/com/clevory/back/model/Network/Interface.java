package com.clevory.back.model.network;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "INTERFACE")
@Getter @Setter
public class Interface {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String ipAddress;
    private String type;
    private String speed;
    private String state;

//    //will be managed by :
//    @ManyToOne
//    private User user;

    //Belongs to :
    @JsonIgnore
    @ManyToMany(mappedBy = "deviceInterfaces")
    Set<Device> devices;

    //Use :
    @OneToOne
    private Protocol protocol;
}
