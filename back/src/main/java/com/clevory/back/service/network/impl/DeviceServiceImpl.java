package com.clevory.back.service.network.impl;

import com.clevory.back.dto.mapper.itf.NetworkStructMapper;
import com.clevory.back.dto.network.response.DeviceResponseDto;
import com.clevory.back.model.network.*;
import com.clevory.back.repository.network.DeviceRepository;
import com.clevory.back.repository.network.InterfaceRepository;
import com.clevory.back.repository.network.ProtocolRepository;
import com.clevory.back.service.network.itf.DeviceService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeviceServiceImpl implements DeviceService {

    private DeviceRepository deviceRepository;
    private InterfaceRepository interfaceRepository;
    private ProtocolRepository protocolRepository;
    private NetworkStructMapper networkStructMapper;

    public DeviceServiceImpl(
            DeviceRepository deviceRepository,
            InterfaceRepository interfaceRepository,
            ProtocolRepository protocolRepository,
            NetworkStructMapper networkStructMapper
    )
    {
        this.deviceRepository = deviceRepository;
        this.interfaceRepository = interfaceRepository;
        this.protocolRepository = protocolRepository;
        this.networkStructMapper = networkStructMapper;
    }

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

    @Override
    public List<DeviceResponseDto> getDeviceWithDetails() {
        return  networkStructMapper.getAllDeviceDtos(getDevices());
    }

    @Override
    public DeviceResponseDto addInterfaceToDevice(long id, Interface anInterface) {
        Device device = deviceRepository.findById(id).get();

        anInterface = interfaceRepository.save(anInterface);

        device.getDeviceInterfaces().add(anInterface);
        deviceRepository.save(device);

        return networkStructMapper.deviceToDeviceResponseDto(device);
    }

    @Override
    public DeviceResponseDto addProtocolToDevice(long id, Protocol protocol) {
        Device device = deviceRepository.findById(id).get();

        protocol = protocolRepository.save(protocol);

        device.getDeviceProtocols().add(protocol);
        deviceRepository.save(device);

        return networkStructMapper.deviceToDeviceResponseDto(device);
    }

}
