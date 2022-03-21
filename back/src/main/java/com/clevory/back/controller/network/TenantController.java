package com.clevory.back.controller.network;

import com.clevory.back.model.network.Tenant;
import com.clevory.back.service.network.itf.TenantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
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
    public Tenant create (@RequestBody Tenant tenant) {return tenantService.save(tenant);}

    @PutMapping("/{id}")
    public Tenant update (@PathVariable("id") long id, @RequestBody  Tenant tenant) {
        return tenantService.update(id, tenant);
    }

    @DeleteMapping("/{id}")
    public List<Tenant> deleteById(@PathVariable("id") long id) {return tenantService.deleteTenant(id);}
}
