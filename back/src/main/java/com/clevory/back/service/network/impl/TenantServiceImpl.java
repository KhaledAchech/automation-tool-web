package com.clevory.back.service.network.impl;

import com.clevory.back.model.network.Tenant;
import com.clevory.back.repository.network.TenantRepository;
import com.clevory.back.service.network.itf.TenantService;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class TenantServiceImpl implements TenantService {

    private TenantRepository tenantRepository;

    @Override
    public List<Tenant> getTenants() {
        return null;
    }

    @Override
    public List<Tenant> deleteTenant(long id) {
        return null;
    }

    @Override
    public Tenant getTenantById(long id) {
        return null;
    }

    @Override
    public Tenant saveOrUpdate(Tenant tenant) {
        return null;
    }
}
