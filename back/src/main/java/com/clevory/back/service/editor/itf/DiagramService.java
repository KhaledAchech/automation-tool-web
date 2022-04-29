package com.clevory.back.service.editor.itf;

import com.clevory.back.commun.wrapper.StringResponse;
import com.clevory.back.model.editor.Diagram;
import com.clevory.back.model.editor.Link;
import com.clevory.back.model.editor.Node;

import java.util.ArrayList;
import java.util.List;

public interface DiagramService {
    List<Object> getAll();
    Object save(Diagram diagram);// initialize an empty diagram with the creation of a topology.
    String create(Diagram diagram);
    Object getById (String id);
    Object update(String id, Diagram diagram);
    Object delete (String id);

    Object getDiagrambyDiagramID (long id);
    ArrayList<Node> getNodes(long id);
    ArrayList<Link> getLinks(long id);
    Diagram getDiagramNodesAndLinks(long id);

    StringResponse getDiagramName(long id);

    StringResponse updateDiagram(long id, Diagram diagram);

}
