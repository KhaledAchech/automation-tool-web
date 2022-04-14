package com.clevory.back.service.editor.impl;

import com.clevory.back.model.network.TestTopology;
import com.clevory.back.repository.editor.TestTopologyRepository;
import com.clevory.back.service.editor.itf.TestTopologyService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class TestTopologyServiceImpl implements TestTopologyService {

    private TestTopologyRepository testTopologyRepository;

    @Override
    public List<TestTopology> getTestTopologies() {
        return null;
    }

    @Override
    public TestTopology save(TestTopology testTopology) {
        return testTopologyRepository.create(testTopology);
    }
}
