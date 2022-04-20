package com.clevory.back.service.editor.itf;

import com.clevory.back.model.editor.Diagram;

import java.util.List;

public interface DiagramService {
    List<Object> getAll();
    String save(Diagram diagram);
    Object getById (String id);
    Object update(String id, Diagram diagram);
    Object delete (String id);

}
