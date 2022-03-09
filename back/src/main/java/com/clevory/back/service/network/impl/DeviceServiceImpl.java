package com.clevory.back.service.network.impl;

import com.clevory.back.model.network.Device;
import com.clevory.back.repository.network.DeviceRepository;
import com.clevory.back.service.network.itf.DeviceService;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DeviceServiceImpl implements DeviceService {

    private DeviceRepository deviceRepository;

    @Override
    public List<Device> getDevices() {
        return null;
    }

    @Override
    public List<Device> deleteDevice(long id) {
        return null;
    }

    @Override
    public Device getDeviceById(long id) {
        return null;
    }

    @Override
    public Device saveOrUpdate(Device device) {
        return null;
    }
}
