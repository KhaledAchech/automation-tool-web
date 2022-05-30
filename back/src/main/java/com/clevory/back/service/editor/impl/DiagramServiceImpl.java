package com.clevory.back.service.editor.impl;

import com.clevory.back.commun.wrapper.StringResponse;
import com.clevory.back.model.editor.Diagram;
import com.clevory.back.model.editor.Link;
import com.clevory.back.model.editor.Node;
import com.clevory.back.repository.editor.DiagramRepository;
import com.clevory.back.service.editor.itf.DiagramService;
import jdk.jshell.Diag;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
@AllArgsConstructor
public class DiagramServiceImpl implements DiagramService {

    private DiagramRepository diagramRepository;

    @Override
    public List<Object> getAll() {
        return diagramRepository.getAll();
    }

    @Override
    public Object save(Diagram diagram) {
        return diagramRepository.save(diagram);
    }

    @Override
    public String create(Diagram diagram) {
        return diagramRepository.create(diagram);
    }

    @Override
    public Object getById(String id) {
        return diagramRepository.getById(id);
    }

    @Override
    public Object update(String id, Diagram diagram) {
        return diagramRepository.update(id,diagram);
    }

    @Override
    public Object delete(String id) {
        return diagramRepository.delete(id);
    }

    @Override
    public Object getDiagrambyDiagramID(long id) {
        return diagramRepository.getDiagramByDiagramId(id);
    }

    @Override
    public ArrayList<HashMap> getNodes(long id) {
        return diagramRepository.getDiagramNodes(id);
    }

    @Override
    public ArrayList<HashMap> getLinks(long id) {
        return diagramRepository.getDiagramLinks(id);
    }

    @Override
    public Diagram getDiagramNodesAndLinks(long id) {
        //ArrayList<Node> nodes = this.getNodes(id);
        //ArrayList<HashMap> links = this.getLinks(id);
        //Diagram diagram =
        return null;
    }

    @Override
    public Node getNodeFromDiagram(long id, String text) {
        return diagramRepository.findNodeInDiagram(id,text);
    }

    @Override
    public StringResponse getDiagramName(long id) {
        StringResponse response = new StringResponse(diagramRepository.getDiagramNameByDiagramId(id));
        return response;
    }

    @Override
    public ArrayList<HashMap> addLink(long id, String from, String to) {
        return diagramRepository.addLink(id, from, to);
    }

    @Override
    public StringResponse updateDiagram(long id, Diagram diagram) {
        StringResponse response = new StringResponse(diagramRepository.replace(id,diagram));
        return response;
    }

    @Override
    public StringResponse deleteDiagramData(long id) {
        StringResponse response = new StringResponse(diagramRepository.deleteDiagramData(id));
        return response;
    }
}
