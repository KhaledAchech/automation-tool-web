package com.clevory.back.model.editor;

import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class Diagram {
    private String name;
    private Set<Node> nodes;
    private Set<Link> links;
}
