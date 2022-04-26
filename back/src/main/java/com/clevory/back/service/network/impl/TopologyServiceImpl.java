package com.clevory.back.service.network.impl;

import com.clevory.back.dto.mapper.itf.NetworkStructMapper;
import com.clevory.back.dto.network.response.TopologyResponseDto;
import com.clevory.back.model.editor.Diagram;
import com.clevory.back.model.network.Device;
import com.clevory.back.model.network.Tenant;
import com.clevory.back.model.network.Topology;
import com.clevory.back.repository.editor.DiagramRepository;
import com.clevory.back.repository.network.DeviceRepository;
import com.clevory.back.repository.network.TopologyRepository;
import com.clevory.back.service.network.itf.TopologyService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TopologyServiceImpl implements TopologyService {

    private TopologyRepository topologyRepository;
    private DeviceRepository deviceRepository;
    private DiagramRepository diagramRepository;
    private NetworkStructMapper networkStructMapper;

    public TopologyServiceImpl (
            TopologyRepository topologyRepository,
            DeviceRepository deviceRepository,
            DiagramRepository diagramRepository,
            NetworkStructMapper networkStructMapper
    )
    {
        this.topologyRepository = topologyRepository;
        this.deviceRepository = deviceRepository;
        this.diagramRepository = diagramRepository;
        this.networkStructMapper = networkStructMapper;
    }

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
        Diagram diagram = new Diagram();
        diagram.setDiagramId(topology.getId());
        diagram.setName(topology.getName() + " " + "Diagram");
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

        topology.getTopologyDevices().add(device);
        topologyRepository.save(topology);

        return networkStructMapper.topologyToTopologyResponseDto(topology);
    }
}
