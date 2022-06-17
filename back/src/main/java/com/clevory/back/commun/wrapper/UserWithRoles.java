package com.clevory.back.commun.wrapper;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserWithRoles {
    private String username;
    private String password;
    private String rolename;
}
