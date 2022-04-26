package com.clevory.back.controller.network;

import com.clevory.back.dto.network.response.TopologyResponseDto;
import com.clevory.back.model.network.Device;
import com.clevory.back.model.network.Topology;
import com.clevory.back.service.network.itf.TopologyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
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
    public Topology create (@RequestBody Topology topology) {return topologyService.save(topology);}

    @PutMapping("/{id}")
    public Topology update (@PathVariable("id") long id, @RequestBody  Topology topology) {
        return topologyService.update(id, topology);
    }

    @DeleteMapping("/{id}")
    public List<Topology> deleteById(@PathVariable("id") long id) {return topologyService.deleteTopology(id);}

    @GetMapping("/devices")
    public List<TopologyResponseDto> getTopologiesWithDevices()
    {
        return topologyService.getTopologiesWithDevices();
    }

    @PostMapping("/{id}/addDevice")
    public TopologyResponseDto addDevice (@PathVariable("id") long id,@RequestBody Device device) {return topologyService.addDeviceToTopology(id, device.getId());}
}
