package com.clevory.back.service.network.itf;

import com.clevory.back.model.network.Device;
import com.clevory.back.model.network.Interface;

import java.util.List;

public interface DeviceService {
    List<Device> getDevices();
    List<Device> deleteDevice(long id);
    Device getDeviceById(long id);
    Device save(Device device);
    Device update(long id,Device device);
}
