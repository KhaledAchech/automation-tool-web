package com.clevory.back.service.network.impl;

import com.clevory.back.dto.mapper.itf.DiagramStructMapper;
import com.clevory.back.dto.mapper.itf.NetworkStructMapper;
import com.clevory.back.dto.network.response.TopologyResponseDto;
import com.clevory.back.model.editor.Diagram;
import com.clevory.back.model.editor.Link;
import com.clevory.back.model.editor.Node;
import com.clevory.back.model.network.Device;
import com.clevory.back.model.network.Tenant;
import com.clevory.back.model.network.Topology;
import com.clevory.back.repository.editor.DiagramRepository;
import com.clevory.back.repository.network.DeviceRepository;
import com.clevory.back.repository.network.TopologyRepository;
import com.clevory.back.service.network.itf.TopologyService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TopologyServiceImpl implements TopologyService {

    private TopologyRepository topologyRepository;
    private DeviceRepository deviceRepository;
    private DiagramRepository diagramRepository;

    private NetworkStructMapper networkStructMapper;
    private DiagramStructMapper diagramStructMapper;

    public TopologyServiceImpl (
            TopologyRepository topologyRepository,
            DeviceRepository deviceRepository,
            DiagramRepository diagramRepository,
            NetworkStructMapper networkStructMapper,
            DiagramStructMapper diagramStructMapper
    )
    {
        this.topologyRepository = topologyRepository;
        this.deviceRepository = deviceRepository;
        this.diagramRepository = diagramRepository;
        this.networkStructMapper = networkStructMapper;
        this.diagramStructMapper = diagramStructMapper;
    }

    @Override
    public List<Topology> getTopologies()
    {
        return topologyRepository.findAll();
    }

    @Override
    public List<Topology> deleteTopology(long id)
    {
        this.unAssignDevicesToTopology(id);
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
        Diagram diagram = new Diagram();
        diagram.setDiagramId(topology.getId());
        diagram.setName(topology.getName() + " " + "Diagram");
        diagram.setNodes(new ArrayList<Node>());
        diagram.setLinks(new ArrayList<Link>());
        diagramRepository.save(diagram);
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

    @Override
    public List<TopologyResponseDto> getTopologiesWithDevices() {
        return networkStructMapper.getAllTopologyDtos(getTopologies());
    }

    @Override
    public TopologyResponseDto addDeviceToTopology(long id, long deviceID) {

        Topology topology = topologyRepository.findById(id).get();

        Device device = deviceRepository.findById(deviceID).get();
        if (device.isAssigned())
            return null;
        device.setAssigned(true);
        device = deviceRepository.save(device);
        Node node = diagramStructMapper.DeviceToNodeDTO(device);
        diagramRepository.addNode(node, id);

        topology.getTopologyDevices().add(device);
        topologyRepository.save(topology);

        return networkStructMapper.topologyToTopologyResponseDto(topology);
    }

    @Override
    public TopologyResponseDto unAssignDevicesToTopology(long id) {
        diagramRepository.deleteDiagramData(id);

        Topology topology = topologyRepository.findById(id).get();
        for (Device device : topology.getTopologyDevices())
        {
            device.getTopologies().remove(topology);
            device.setAssigned(false);
            deviceRepository.save(device);
        }
        topologyRepository.save(topology);
        return networkStructMapper.topologyToTopologyResponseDto(topology);
    }
}
