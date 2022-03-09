package com.clevory.back.controller.network;

import com.clevory.back.model.network.Interface;
import com.clevory.back.model.network.Tenant;
import com.clevory.back.service.network.itf.TenantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tenants")
public class TenantController {

    private TenantService tenantService;
    @Autowired
    public TenantController(TenantService tenantService)
    {
        super();
        this.tenantService = tenantService;
    }

    @GetMapping
    public List<Tenant> getAll()
    {
        return tenantService.getTenants();
    }

    @GetMapping("/{id}")
    public Tenant getById(@PathVariable long id)
    {
        return tenantService.getTenantById(id);
    }

    @PostMapping
    public Tenant createOrUpdate (@RequestBody Tenant tenant) {return tenantService.saveOrUpdate(tenant);}

    @DeleteMapping("/{id}")
    public List<Tenant> deleteById(@PathVariable("id") long id) {return tenantService.deleteTenant(id);}
}
