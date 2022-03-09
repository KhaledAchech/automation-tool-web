package com.clevory.back.service.network.itf;

import com.clevory.back.model.network.Topology;

import java.util.List;

public interface TopologyService {
    List<Topology> getTopologies();
    List<Topology> deleteTopology(long id);
    Topology getTopologyById(long id);
    Topology saveOrUpdate(Topology topology);
}
