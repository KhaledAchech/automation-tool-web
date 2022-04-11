package com.clevory.back.service.network.itf;

import com.clevory.back.dto.network.response.TenantResponseDto;
import com.clevory.back.model.network.Tenant;
import com.clevory.back.model.network.Topology;

import java.util.List;

public interface TenantService {
    List<Tenant> getTenants();
    List<Tenant> deleteTenant(long id);
    Tenant getTenantById(long id);
    Tenant save(Tenant tenant);
    Tenant update(long id,Tenant tenant);

    //DTO Repsonse with list of topologies
    List<TenantResponseDto> getTenantWithTopologies ();

    //Add a topology to a tenant
    TenantResponseDto addTopologyToTenant (long id, Topology topology);
}
