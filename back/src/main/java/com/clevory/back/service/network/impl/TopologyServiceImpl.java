package com.clevory.back.service.network.impl;

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
        return topologyRepository.getById(id);
    }

    @Override
    public Topology saveOrUpdate(Topology topology)
    {
        topologyRepository.save(topology);
        return topology;
    }
}
