package com.clevory.back.service.network.itf;

import com.clevory.back.model.network.Topology;
import com.clevory.back.model.user.User;

import java.util.List;

public interface TopologyService {
    List<Topology> getTopologies();
    List<Topology> deleteTopology(long id);
    Topology getTopologyById(long id);
    Topology save(Topology topology);
    Topology update(long id,Topology topology);
}
