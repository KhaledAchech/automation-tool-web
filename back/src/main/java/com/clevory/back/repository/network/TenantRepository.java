package com.clevory.back.repository.network;

import com.clevory.back.model.network.Tenant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TenantRepository extends JpaRepository<Tenant, Long> {
}
