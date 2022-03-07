package com.clevory.back.model.Network;

import com.clevory.back.model.user.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Time;

@Entity
@Getter @Setter
public class Configuration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 50)
    private Date date;

    @Column(length = 50)
    private Time ios;

    private String status;

}
