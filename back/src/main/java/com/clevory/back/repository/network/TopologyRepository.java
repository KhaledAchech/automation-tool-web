package com.clevory.back.repository.network;

import com.clevory.back.model.network.Topology;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TopologyRepository extends JpaRepository<Topology,Long> {
}
