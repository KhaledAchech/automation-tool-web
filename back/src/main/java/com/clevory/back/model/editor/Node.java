package com.clevory.back.model.editor;

import com.clevory.back.commun.Type;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Node {

    private String key;  // device id in string
    private String text; //hostname of the device
    private Type type; //type of the device
    private String loc;
    private long diagramId;
}
