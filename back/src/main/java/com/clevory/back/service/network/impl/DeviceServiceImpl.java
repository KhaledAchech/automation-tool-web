package com.clevory.back.service.network.impl;

import com.clevory.back.model.network.Configuration;
import com.clevory.back.model.network.Device;
import com.clevory.back.repository.network.DeviceRepository;
import com.clevory.back.service.network.itf.DeviceService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class DeviceServiceImpl implements DeviceService {

    private DeviceRepository deviceRepository;

    @Override
    public List<Device> getDevices()
    {
        return deviceRepository.findAll();
    }

    @Override
    public List<Device> deleteDevice(long id)
    {
        deviceRepository.deleteById(id);
        return deviceRepository.findAll();
    }

    @Override
    public Device getDeviceById(long id)
    {
        return deviceRepository.findById(id).get();
    }

    @Override
    public Device save(Device device) {
        deviceRepository.save(device);
        return device;
    }

    @Override
    public Device update(long id, Device device) {
        Device thisDevice = this.getDeviceById(id);
        thisDevice.setName(device.getName());
        thisDevice.setOs(device.getOs());
        thisDevice.setStatus(device.getStatus());

        deviceRepository.save(thisDevice);
        return thisDevice;
    }

}
