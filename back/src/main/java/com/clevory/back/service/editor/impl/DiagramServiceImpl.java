package com.clevory.back.service.editor.impl;

import com.clevory.back.model.editor.Diagram;
import com.clevory.back.model.editor.Link;
import com.clevory.back.model.editor.Node;
import com.clevory.back.repository.editor.DiagramRepository;
import com.clevory.back.service.editor.itf.DiagramService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
    public String save(Diagram diagram) {
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
    public ArrayList<Node> getNodes(String id) {
        return diagramRepository.getDiagramNodes(id);
    }

    @Override
    public ArrayList<Link> getLinks(String id) {
        return diagramRepository.getDiagramLinks(id);
    }
}
