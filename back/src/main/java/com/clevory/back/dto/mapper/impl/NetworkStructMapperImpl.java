package com.clevory.back.dto.mapper.impl;

import com.clevory.back.dto.mapper.itf.NetworkStructMapper;
import com.clevory.back.dto.network.response.DeviceResponseDto;
import com.clevory.back.dto.network.response.TenantResponseDto;
import com.clevory.back.dto.network.response.TopologyResponseDto;
import com.clevory.back.dto.network.response.slim.DeviceSlimDto;
import com.clevory.back.dto.network.response.slim.InterfaceSlimDto;
import com.clevory.back.dto.network.response.slim.ProtocolSlimDto;
import com.clevory.back.dto.network.response.slim.TopologySlimDto;
import com.clevory.back.model.network.*;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
public class NetworkStructMapperImpl implements NetworkStructMapper {

    /******************************************************************************************************************/
    //Tenant with topologies :

    @Override
    public TopologySlimDto topologyToTopologySlimDto(Topology topology) {

        if ( topology == null ) {
            return null;
        }

        TopologySlimDto topologySlimDto = new TopologySlimDto();

        topologySlimDto.setId(topology.getId());
        topologySlimDto.setName(topology.getName());
        topologySlimDto.setType(topology.getType());

        return topologySlimDto;
    }


    @Override
    public TenantResponseDto tenantToTenantResponseDto(Tenant tenant) {
        if ( tenant == null ) {
            return null;
        }

        TenantResponseDto tenantResponseDto = new TenantResponseDto();

        tenantResponseDto.setId( tenant.getId() );
        tenantResponseDto.setName( tenant.getName() );

        tenantResponseDto.setTopologies( topologiesToTopologySlimDtos( tenant.getTopologies() ) );

        return tenantResponseDto;
    }

    @Override
    public List<TenantResponseDto> getAllTenantDtos(List<Tenant> tenants) {
        if ( tenants == null ) {
            return null;
        }

        List<TenantResponseDto> list = new ArrayList<TenantResponseDto>( tenants.size() );
        for ( Tenant tenant : tenants ) {
            list.add( tenantToTenantResponseDto( tenant ) );
        }

        return list;
    }

    protected List<TopologySlimDto> topologiesToTopologySlimDtos(List<Topology> list) {
        if ( list == null ) {
            return null;
        }

        List<TopologySlimDto> list1 = new ArrayList<TopologySlimDto>(Math.max((int) (list.size() / .75f) + 1, 16)) {
        };
        for ( Topology topology : list ) {
            list1.add( topologyToTopologySlimDto( topology ) );
        }

        return list1;
    }

    /******************************************************************************************************************/
    /******************************************************************************************************************/
    // Topology with devices.

    @Override
    public DeviceSlimDto deviceToDeviceSlimDto(Device device) {
        if ( device == null ) {
            return null;
        }

        DeviceSlimDto deviceSlimDto = new DeviceSlimDto();

        deviceSlimDto.setId(device.getId());
        deviceSlimDto.setName(device.getName());

        return deviceSlimDto;
    }

    @Override
    public TopologyResponseDto topologyToTopologyResponseDto(Topology topology) {
        if ( topology == null ) {
            return null;
        }

        TopologyResponseDto topologyResponseDto = new TopologyResponseDto();

        topologyResponseDto.setId( topology.getId() );
        topologyResponseDto.setName( topology.getName() );
        topologyResponseDto.setType( topology.getType() );

        topologyResponseDto.setDevices( devicesToDeviceSlimDtos( topology.getTopologyDevices() ) );

        return topologyResponseDto;
    }

    @Override
    public List<TopologyResponseDto> getAllTopologyDtos(List<Topology> topologies) {
        if ( topologies == null ) {
            return null;
        }

        List<TopologyResponseDto> list = new ArrayList<TopologyResponseDto>( topologies.size() );
        for ( Topology topology : topologies ) {
            list.add( topologyToTopologyResponseDto( topology ) );
        }

        return list;
    }

    protected Set<DeviceSlimDto> devicesToDeviceSlimDtos (Set<Device> set) {
        if ( set == null ) {
            return null;
        }

        Set<DeviceSlimDto> set1 = new HashSet<DeviceSlimDto>(Math.max((int) (set.size() / .75f) + 1, 16)) {
        };
        for ( Device device : set ) {
            set1.add( deviceToDeviceSlimDto( device ) );
        }

        return set1;
    }

    /******************************************************************************************************************/
    /******************************************************************************************************************/
    // device with topologies, interfaces and protocols

    @Override
    public InterfaceSlimDto interfaceToInterfaceSlimDto(Interface anInterface) {
        if ( anInterface == null ) {
            return null;
        }

        InterfaceSlimDto interfaceSlimDto = new InterfaceSlimDto();

        interfaceSlimDto.setId(anInterface.getId());
        interfaceSlimDto.setIpAddress(anInterface.getIpAddress());
        interfaceSlimDto.setType(anInterface.getType());

        return interfaceSlimDto;
    }

    @Override
    public ProtocolSlimDto protocolToProtocolSlimDto(Protocol protocol) {
        if ( protocol == null ) {
            return null;
        }

        ProtocolSlimDto protocolSlimDto = new ProtocolSlimDto();

        protocolSlimDto.setId(protocol.getId());
        protocolSlimDto.setName(protocol.getName());

        return protocolSlimDto;
    }

    @Override
    public DeviceResponseDto deviceToDeviceResponseDto(Device device) {

        if ( device == null ) {
            return null;
        }

        DeviceResponseDto deviceToDeviceResponseDto = new DeviceResponseDto();

        deviceToDeviceResponseDto.setId( device.getId() );
        deviceToDeviceResponseDto.setName( device.getName() );
        deviceToDeviceResponseDto.setHostname( device.getHostname() );
        deviceToDeviceResponseDto.setType( device.getType() );
        deviceToDeviceResponseDto.setOs( device.getOs() );
        deviceToDeviceResponseDto.setVendor( device.getVendor() );
        deviceToDeviceResponseDto.setAssigned( device.isAssigned() );
        deviceToDeviceResponseDto.setStatus( device.getStatus() );

        //deviceToDeviceResponseDto.setTopologies( topologiesToTopologySlimDtosSet( device.getTopologies()) );
        deviceToDeviceResponseDto.setInterfaces( interfacesToInterfaceSlimDtos( device.getDeviceInterfaces()) );
        deviceToDeviceResponseDto.setProtocols( protoclsToProtocolSlimDtos( device.getDeviceProtocols()) );

        return deviceToDeviceResponseDto;
    }

    @Override
    public List<DeviceResponseDto> getAllDeviceDtos(List<Device> devices) {
        if ( devices == null ) {
            return null;
        }

        List<DeviceResponseDto> list = new ArrayList<DeviceResponseDto>( devices.size() );
        for ( Device device : devices ) {
            list.add( deviceToDeviceResponseDto( device ) );
        }

        return list;
    }

    protected Set<TopologySlimDto> topologiesToTopologySlimDtosSet (Set<Topology> set) {
        if ( set == null ) {
            return null;
        }

        Set<TopologySlimDto> set1 = new HashSet<TopologySlimDto>(Math.max((int) (set.size() / .75f) + 1, 16)) {
        };
        for ( Topology topology : set ) {
            set1.add( topologyToTopologySlimDto( topology ) );
        }

        return set1;
    }


    protected Set<InterfaceSlimDto> interfacesToInterfaceSlimDtos (Set<Interface> set) {
        if ( set == null ) {
            return null;
        }

        Set<InterfaceSlimDto> set1 = new HashSet<InterfaceSlimDto>(Math.max((int) (set.size() / .75f) + 1, 16)) {
        };
        for ( Interface anInterface : set ) {
            set1.add( interfaceToInterfaceSlimDto( anInterface ) );
        }

        return set1;
    }

    protected Set<ProtocolSlimDto> protoclsToProtocolSlimDtos (Set<Protocol> set) {
        if ( set == null ) {
            return null;
        }

        Set<ProtocolSlimDto> set1 = new HashSet<ProtocolSlimDto>(Math.max((int) (set.size() / .75f) + 1, 16)) {
        };
        for ( Protocol protocol : set ) {
            set1.add( protocolToProtocolSlimDto( protocol ) );
        }

        return set1;
    }

    /******************************************************************************************************************/

}
