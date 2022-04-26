package com.clevory.back.dto.mapper.itf;

import com.clevory.back.dto.network.response.DeviceResponseDto;
import com.clevory.back.dto.network.response.TenantResponseDto;
import com.clevory.back.dto.network.response.TopologyResponseDto;
import com.clevory.back.dto.network.response.slim.DeviceSlimDto;
import com.clevory.back.dto.network.response.slim.InterfaceSlimDto;
import com.clevory.back.dto.network.response.slim.ProtocolSlimDto;
import com.clevory.back.dto.network.response.slim.TopologySlimDto;
import com.clevory.back.model.network.*;

import java.util.List;



public interface NetworkStructMapper {

    //Mapping entities
    TopologySlimDto topologyToTopologySlimDto (Topology topology);
    DeviceSlimDto deviceToDeviceSlimDto (Device device);
    InterfaceSlimDto interfaceToInterfaceSlimDto (Interface anInterface);
    ProtocolSlimDto protocolToProtocolSlimDto (Protocol protocol);

    //Display response DTO
    TenantResponseDto tenantToTenantResponseDto(Tenant tenant);
    List<TenantResponseDto> getAllTenantDtos (List<Tenant> tenants);

    DeviceResponseDto deviceToDeviceResponseDto(Device device);
    List<DeviceResponseDto> getAllDeviceDtos (List<Device> devices);

    TopologyResponseDto topologyToTopologyResponseDto (Topology topology);
    List<TopologyResponseDto> getAllTopologyDtos (List<Topology> topologies);


    //Post/Put request DTO

}
