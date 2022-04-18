package com.clevory.back.service.editor.impl;

import com.clevory.back.model.editor.TestTopology;
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
    public List<Object> getAll() {
        return testTopologyRepository.getAll();
    }

    @Override
    public TestTopology save(TestTopology testTopology) {
        return testTopologyRepository.create(testTopology);
    }

    @Override
    public Object getById(String id) {
        return testTopologyRepository.getById(id);
    }

    @Override
    public Object update(String id, TestTopology testTopology) {
        return testTopologyRepository.update(id,testTopology);
    }

    @Override
    public Object delete(String id) {
        return testTopologyRepository.delete(id);
    }
}
