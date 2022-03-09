package com.clevory.back.controller.network;

import com.clevory.back.model.network.Interface;
import com.clevory.back.model.network.Topology;
import com.clevory.back.service.network.itf.TopologyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/topologies")
public class TopologyController {

    private TopologyService topologyService;
    @Autowired
    public TopologyController(TopologyService topologyService)
    {
        super();
        this.topologyService = topologyService;
    }

    @GetMapping
    public List<Topology> getAll()
    {
        return topologyService.getTopologies();
    }

    @GetMapping("/{id}")
    public Topology getById(@PathVariable long id)
    {
        return topologyService.getTopologyById(id);
    }

    @PostMapping
    public Topology createOrUpdate (@RequestBody Topology topology) {return topologyService.saveOrUpdate(topology);}

    @DeleteMapping("/{id}")
    public List<Topology> deleteById(@PathVariable("id") long id) {return topologyService.deleteTopology(id);}
}
