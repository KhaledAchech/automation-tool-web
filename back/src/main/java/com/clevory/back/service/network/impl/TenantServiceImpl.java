package com.clevory.back.service.network.impl;

import com.clevory.back.model.network.Protocol;
import com.clevory.back.model.network.Tenant;
import com.clevory.back.repository.network.TenantRepository;
import com.clevory.back.service.network.itf.TenantService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class TenantServiceImpl implements TenantService {

    private TenantRepository tenantRepository;

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

}
