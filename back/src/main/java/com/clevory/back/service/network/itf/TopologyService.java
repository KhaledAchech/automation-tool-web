package com.clevory.back.service.network.itf;

import com.clevory.back.dto.network.response.DeviceResponseDto;
import com.clevory.back.dto.network.response.TenantResponseDto;
import com.clevory.back.dto.network.response.TopologyResponseDto;
import com.clevory.back.model.network.Device;
import com.clevory.back.model.network.Topology;
import com.clevory.back.model.user.User;

import java.util.List;

public interface TopologyService {
    List<Topology> getTopologies();
    List<Topology> deleteTopology(long id);
    Topology getTopologyById(long id);
    Topology save(Topology topology);
    Topology update(long id,Topology topology);

    //DTO Repsonse with list of devices
    List<TopologyResponseDto> getTopologiesWithDevices ();

    //Add a device to a topology
    TopologyResponseDto addDeviceToTopology (long id, Device device);
}
