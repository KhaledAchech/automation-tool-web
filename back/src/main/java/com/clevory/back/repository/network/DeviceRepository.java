package com.clevory.back.repository.network;

import com.clevory.back.model.network.Device;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DeviceRepository extends JpaRepository<Device,Long> {

    Device findByHostname(String hostname);

}
