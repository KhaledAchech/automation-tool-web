package com.clevory.back.model.image;

import com.clevory.back.model.network.Configuration;
import com.clevory.back.model.user.User;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "IMAGE")
@Getter @Setter @NoArgsConstructor
@Data
@ToString
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "type")
    private String type;

    //image bytes can have large lengths so we specify a value
    //which is more than the default length for picByte column
    @Lob
    @Column(name = "picByte")
    private byte[] picByte;

    //belongs to :
    @OneToOne
    private User user;

    public Image(String name, String type, byte[] picByte) {
        this.name = name;
        this.type = type;
        this.picByte = picByte;
    }

}
