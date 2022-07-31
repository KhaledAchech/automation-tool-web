package com.clevory.back.service.network.impl;

import com.clevory.back.model.network.Device;
import com.clevory.back.model.network.Interface;
import com.clevory.back.model.network.Protocol;
import com.clevory.back.repository.network.InterfaceRepository;
import com.clevory.back.service.network.itf.InterfaceService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class InterfaceServiceImpl implements InterfaceService {

    private InterfaceRepository interfaceRepository;

    @Override
    public List<Interface> getInterfaces()
    {
        return interfaceRepository.findAll();
    }

    @Override
    public List<Interface> deleteInterface(long id) {

        Interface anInterface = interfaceRepository.findById(id).get();

        for (Device device : anInterface.getDevices())
        {
            System.out.println(device.getDeviceInterfaces());
            device.getDeviceInterfaces().remove(anInterface);
        }

        interfaceRepository.deleteById(id);
        return interfaceRepository.findAll();
    }

    @Override
    public Interface getInterfaceById(long id)
    {
        return interfaceRepository.findById(id).get();
    }

    @Override
    public Interface save(Interface anInterface) {
        interfaceRepository.save(anInterface);
        return anInterface;
    }

    @Override
    public Interface update(long id, Interface anInterface) {
        Interface thisInterface = this.getInterfaceById(id);
        if (anInterface.getIpAddress()!=null)
            thisInterface.setIpAddress(anInterface.getIpAddress());
        if (anInterface.getSpeed()!=null)
            thisInterface.setSpeed(anInterface.getSpeed());
        if (anInterface.getState()!=null)
            thisInterface.setState(anInterface.getState());
        if (anInterface.getType()!=null)
            thisInterface.setType(anInterface.getType());

        interfaceRepository.save(thisInterface);
        return thisInterface;
    }
}
