package com.clevory.back.service.network.impl;

import com.clevory.back.commun.wrapper.ConnectionRequest;
import com.clevory.back.dto.mapper.itf.DiagramStructMapper;
import com.clevory.back.dto.mapper.itf.NetworkStructMapper;
import com.clevory.back.dto.network.response.DeviceResponseDto;
import com.clevory.back.dto.network.response.TopologyResponseDto;
import com.clevory.back.model.editor.Node;
import com.clevory.back.model.network.*;
import com.clevory.back.repository.editor.DiagramRepository;
import com.clevory.back.repository.network.DeviceRepository;
import com.clevory.back.repository.network.InterfaceRepository;
import com.clevory.back.repository.network.ProtocolRepository;
import com.clevory.back.repository.network.TopologyRepository;
import com.clevory.back.service.network.itf.DeviceService;
import com.clevory.back.service.network.itf.TopologyService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class DeviceServiceImpl implements DeviceService {

    private DeviceRepository deviceRepository;
    private InterfaceRepository interfaceRepository;
    private ProtocolRepository protocolRepository;
    private TopologyRepository topologyRepository;
    private DiagramRepository diagramRepository;

    private TopologyService topologyService;

    private DiagramStructMapper diagramStructMapper;
    private NetworkStructMapper networkStructMapper;

    public DeviceServiceImpl(
            DeviceRepository deviceRepository,
            InterfaceRepository interfaceRepository,
            ProtocolRepository protocolRepository,
            TopologyRepository topologyRepository,
            DiagramRepository diagramRepository,
            TopologyService topologyService,
            NetworkStructMapper networkStructMapper,
            DiagramStructMapper diagramStructMapper
    )
    {
        this.deviceRepository = deviceRepository;
        this.interfaceRepository = interfaceRepository;
        this.protocolRepository = protocolRepository;
        this.topologyRepository = topologyRepository;
        this.diagramRepository = diagramRepository;
        this.topologyService = topologyService;
        this.networkStructMapper = networkStructMapper;
        this.diagramStructMapper = diagramStructMapper;
    }

    @Override
    public List<Device> getDevices()
    {
        return deviceRepository.findAll();
    }

    @Override
    public List<Device> deleteDevice(long id)
    {
        Device device = deviceRepository.findById(id).get();
        if (device.isAssigned())
        {
            for (Topology topology : device.getTopologies())
            {
                System.out.println(topology.getTopologyDevices());
                topology.getTopologyDevices().remove(device);
            }
        }

        deviceRepository.deleteById(id);
        return deviceRepository.findAll();
    }

    @Override
    public DeviceResponseDto getDeviceById(long id)
    {
        Device device = deviceRepository.findById(id).get();

        return networkStructMapper.deviceToDeviceResponseDto(device);
    }

    @Override
    public Device getDeviceByHostname(String hostname) {
        return deviceRepository.findByHostname(hostname);
    }

    @Override
    public DeviceResponseDto save(Device device) {
        System.out.println(deviceRepository.findByHostname(device.getHostname()));
        Device existingDevice = deviceRepository.findByHostname(device.getHostname());
        if (existingDevice == null)
            deviceRepository.save(device);
        else
            return networkStructMapper.deviceToDeviceResponseDto(existingDevice);
        return networkStructMapper.deviceToDeviceResponseDto(device);
    }

    @Override
    public Device update(long id, Device device) {
        Device thisDevice = deviceRepository.findById(id).get();

        if (device.getIpAddress()!=null)
            thisDevice.setIpAddress(device.getIpAddress());
        if (device.getOs()!= null)
            thisDevice.setOs(device.getOs());
        if (device.getStatus()!=null)
            thisDevice.setStatus(device.getStatus());
        if (device.getHostname()!=null)
            thisDevice.setHostname(device.getHostname());
        if (device.getType()!=null)
            thisDevice.setType(device.getType());
        if (device.getVendor()!=null)
            thisDevice.setVendor(device.getVendor());
        if (device.getConfiguration()!=null)
            thisDevice.setConfiguration(device.getConfiguration());

        deviceRepository.save(thisDevice);
        return thisDevice;
    }

    @Override
    public List<DeviceResponseDto> getDeviceWithDetails() {
        return  networkStructMapper.getAllDeviceDtos(getDevices());
    }

    @Override
    public DeviceResponseDto addInterfaceToDevice(long id, Interface anInterface) {
        Device device = deviceRepository.findById(id).get();

        anInterface = interfaceRepository.save(anInterface);

        device.getDeviceInterfaces().add(anInterface);
        deviceRepository.save(device);

        return networkStructMapper.deviceToDeviceResponseDto(device);
    }

    @Override
    public DeviceResponseDto addProtocolToDevice(long id, Protocol protocol) {
        Device device = deviceRepository.findById(id).get();

        protocol = protocolRepository.save(protocol);

        device.getDeviceProtocols().add(protocol);
        deviceRepository.save(device);

        return networkStructMapper.deviceToDeviceResponseDto(device);
    }

    @Override
    public Set<Interface> getDeviceInterfaces(long id) {
        Device device = deviceRepository.findById(id).get();
        return device.getDeviceInterfaces();
    }

    @Override
    public Set<Protocol> getDeviceProtocols(long id) {
        Device device = deviceRepository.findById(id).get();
        return device.getDeviceProtocols();
    }

    @Override
    public Optional<Topology> getDeviceTopology(long id) {
        Device device = deviceRepository.findById(id).get();
        Optional<Topology> topology = null;
        if (device.isAssigned()) {
            topology = device.getTopologies().stream().findFirst();
        }
        return topology;
    }

    @Override
    public TopologyResponseDto createConnection(long topologyId, ConnectionRequest connectionRequest) {
        Topology topology = topologyRepository.findById(topologyId).get();
        System.out.println(connectionRequest);
        Device device = deviceRepository.findById(connectionRequest.getMainNodeId()).get();


        if (device.isAssigned())
        {
            //Assign the neighbor to the same topology of the device
            topologyService.addDeviceToTopology(topologyId, connectionRequest.getConnectNodeId());

            Device neighbor = deviceRepository.findById(connectionRequest.getConnectNodeId()).get();

            Node node = diagramStructMapper.DeviceToNodeDTO(neighbor);

            //adding the node to the editor with a location so we can connect it
            node.setLoc("0 0");
            diagramRepository.addNodeWithLocation(node,topologyId);

            //fetching the main node
            Node mainNode = diagramRepository.findNodeInDiagram(topologyId, device.getHostname());

            System.out.println(mainNode.toString());

            if (mainNode.getLoc() == null)
            {
                mainNode.setLoc("0 0");
                diagramRepository.addNodeWithLocation(mainNode,topologyId);
                System.out.println("add link if node loc null");
                diagramRepository.addLink(topologyId, mainNode.getKey(), node.getKey());
            }
            else
            {
                System.out.println("add link if node loc not null ");
                diagramRepository.addLink(topologyId, mainNode.getKey(), node.getKey());
            }
        }


        return networkStructMapper.topologyToTopologyResponseDto(topology);
    }

}
