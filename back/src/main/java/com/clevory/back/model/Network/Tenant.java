package com.clevory.back.model.network;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "TENANT")
@Getter @Setter
public class Tenant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 50)
    private String name;

//    //will be managed by :
//    @ManyToOne
//    private User user;

    //Have multiple topologies :
    @JsonIgnore
    @OneToMany(mappedBy = "tenant", cascade=CascadeType.ALL)
    List<Topology> Topologies = new ArrayList<>();
}
