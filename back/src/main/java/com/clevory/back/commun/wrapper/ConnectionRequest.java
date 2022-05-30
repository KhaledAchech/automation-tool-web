package com.clevory.back.commun.wrapper;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ConnectionRequest {

    long mainNodeId;
    long connectNodeId;
}
