package com.clevory.back.model.user;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 50)
    private String role;

    private boolean permissionToRead;
    private boolean permissionToWrite;
    private boolean permissionToExecute;

}
