package com.clevory.back.model.editor;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Link {

    private long key;   // need to be decremented each time starting from -1
    private String from; // from node id
    private String to;  // to node id
}
