package com.clevory.back.service.editor.itf;

import com.clevory.back.model.editor.Diagram;
import com.clevory.back.model.editor.Link;
import com.clevory.back.model.editor.Node;

import java.util.ArrayList;
import java.util.List;

public interface DiagramService {
    List<Object> getAll();
    String save(Diagram diagram);
    Object getById (String id);
    Object update(String id, Diagram diagram);
    Object delete (String id);

    ArrayList<Node> getNodes(String id);
    ArrayList<Link> getLinks(String id);

}
