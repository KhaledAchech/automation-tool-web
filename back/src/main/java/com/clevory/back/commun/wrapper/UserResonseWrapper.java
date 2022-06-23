package com.clevory.back.commun.wrapper;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserResonseWrapper {
    private long id;
    private String email;
    private String role;
}
