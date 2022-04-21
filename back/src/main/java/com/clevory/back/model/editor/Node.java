package com.clevory.back.model.editor;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Node {

    private String key;  // device id in string
    private String text; //hostname of the device
    private String type; //type of the device
    private String loc;
    private String diagram_id;
}
