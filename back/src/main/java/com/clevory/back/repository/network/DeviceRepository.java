package com.clevory.back.repository.network;

import com.clevory.back.model.network.Device;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeviceRepository extends JpaRepository<Device,Long> {
}
