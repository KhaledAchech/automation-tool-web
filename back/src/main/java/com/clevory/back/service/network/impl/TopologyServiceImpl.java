package com.clevory.back.service.network.impl;

import com.clevory.back.model.network.Topology;
import com.clevory.back.repository.network.TopologyRepository;
import com.clevory.back.service.network.itf.TopologyService;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class TopologyServiceImpl implements TopologyService {

    private TopologyRepository topologyRepository;

    @Override
    public List<Topology> getTopologies() {
        return null;
    }

    @Override
    public List<Topology> deleteTopology(long id) {
        return null;
    }

    @Override
    public Topology getTopologyById(long id) {
        return null;
    }

    @Override
    public Topology saveOrUpdate(Topology topology) {
        return null;
    }
}
