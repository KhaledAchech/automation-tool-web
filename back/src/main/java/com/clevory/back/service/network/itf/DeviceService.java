package com.clevory.back.service.network.itf;

import com.clevory.back.dto.network.response.DeviceResponseDto;
import com.clevory.back.dto.network.response.TenantResponseDto;
import com.clevory.back.dto.network.response.TopologyResponseDto;
import com.clevory.back.model.network.Device;
import com.clevory.back.model.network.Interface;
import com.clevory.back.model.network.Protocol;

import java.util.List;
import java.util.Set;

public interface DeviceService {
    List<Device> getDevices();
    List<Device> deleteDevice(long id);
    Device getDeviceById(long id);
    DeviceResponseDto save(Device device);
    Device update(long id,Device device);

    //DTO Repsonse with list of topologies, interfaces and protocols
    List<DeviceResponseDto> getDeviceWithDetails ();

    //Add an interface to a device
    DeviceResponseDto addInterfaceToDevice (long id, Interface anInterface);
    //Add a protocol to a device
    DeviceResponseDto addProtocolToDevice (long id, Protocol protocol);

    Set<Interface> getDeviceInterfaces (long id);

    Set<Protocol> getDeviceProtocols (long id);

    Device getDeviceFullDetails(long id);
}
