package com.clevory.back.service.editor.itf;


import com.clevory.back.model.network.TestTopology;

import java.util.List;

public interface TestTopologyService {
    List<TestTopology> getTestTopologies();
    TestTopology save(TestTopology testTopology);
}
