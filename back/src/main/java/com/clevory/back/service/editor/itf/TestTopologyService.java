package com.clevory.back.service.editor.itf;


import com.clevory.back.model.network.TestTopology;

import java.util.List;

public interface TestTopologyService {
    List<Object> getAll();
    TestTopology save(TestTopology testTopology);
    Object getById (String id);
    Object update(String id, TestTopology testTopology);
    Object delete (String id);

}
