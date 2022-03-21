package com.clevory.back.service.network.impl;

import com.clevory.back.model.network.Tenant;
import com.clevory.back.model.network.Topology;
import com.clevory.back.repository.network.TopologyRepository;
import com.clevory.back.service.network.itf.TopologyService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class TopologyServiceImpl implements TopologyService {

    private TopologyRepository topologyRepository;

    @Override
    public List<Topology> getTopologies()
    {
        return topologyRepository.findAll();
    }

    @Override
    public List<Topology> deleteTopology(long id)
    {
        topologyRepository.deleteById(id);
        return topologyRepository.findAll();
    }

    @Override
    public Topology getTopologyById(long id)
    {
        return topologyRepository.findById(id).get();
    }

    @Override
    public Topology save(Topology topology) {
        topologyRepository.save(topology);
        return topology;
    }

    @Override
    public Topology update(long id, Topology topology) {
        Topology thisTopology = this.getTopologyById(id);
        thisTopology.setName(topology.getName());
        thisTopology.setType(topology.getType());
        topologyRepository.save(thisTopology);
        return thisTopology;
    }
}
