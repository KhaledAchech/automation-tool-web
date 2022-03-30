package com.clevory.back.service.network.impl;

import com.clevory.back.dto.mapper.itf.NetworkStructMapper;
import com.clevory.back.dto.network.response.TenantResponseDto;
import com.clevory.back.model.network.Protocol;
import com.clevory.back.model.network.Tenant;
import com.clevory.back.model.network.Topology;
import com.clevory.back.repository.network.TenantRepository;
import com.clevory.back.repository.network.TopologyRepository;
import com.clevory.back.service.network.itf.TenantService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;

@Service
public class TenantServiceImpl implements TenantService {

    private TenantRepository tenantRepository;
    private TopologyRepository topologyRepository;

    private NetworkStructMapper networkStructMapper;

    @Autowired
    public TenantServiceImpl (
            TenantRepository tenantRepository,
            TopologyRepository topologyRepository,
            NetworkStructMapper networkStructMapper)
    {
        this.tenantRepository = tenantRepository;
        this.topologyRepository = topologyRepository;
        this.networkStructMapper = networkStructMapper;
    }


    @Override
    public List<Tenant> getTenants()
    {
        return tenantRepository.findAll();
    }

    @Override
    public List<Tenant> deleteTenant(long id)
    {
        tenantRepository.deleteById(id);
        return tenantRepository.findAll();
    }

    @Override
    public Tenant getTenantById(long id)
    {
        return tenantRepository.findById(id).get();
    }

    @Override
    public Tenant save(Tenant tenant) {
        tenantRepository.save(tenant);
        return tenant;
    }

    @Override
    public Tenant update(long id, Tenant tenant) {
        Tenant thisTenant = this.getTenantById(id);
        thisTenant.setName(tenant.getName());

        tenantRepository.save(thisTenant);
        return thisTenant;
    }

    public List<TenantResponseDto> getTenantWithTopologies ()
    {
        return networkStructMapper.getAllTenantDtos(getTenants());
    }

    @Override
    public TenantResponseDto addTopologyToTenant(long id, Topology topology){
        Tenant tenant = tenantRepository.findById(id).get();
        topology.setTenant(tenant);
        topology = topologyRepository.save(topology);
        tenant.getTopologies().add(topology);
        tenantRepository.save(tenant);
        return networkStructMapper.tenantToTenantResponseDto(tenant);
    }

}
