package com.clevory.back.service.network.itf;

import com.clevory.back.model.network.Tenant;

import java.util.List;

public interface TenantService {
    List<Tenant> getTenants();
    List<Tenant> deleteTenant(long id);
    Tenant getTenantById(long id);
    Tenant saveOrUpdate(Tenant tenant);
}
