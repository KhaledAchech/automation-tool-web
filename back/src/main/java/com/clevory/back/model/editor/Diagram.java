package com.clevory.back.model.editor;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
public class Diagram {
    private String name;
    private ArrayList<Node> nodes;
    private ArrayList<Link> links;
}
