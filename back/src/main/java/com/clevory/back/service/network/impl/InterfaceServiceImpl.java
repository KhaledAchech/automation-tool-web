package com.clevory.back.service.network.impl;

import com.clevory.back.model.network.Interface;
import com.clevory.back.repository.network.InterfaceRepository;
import com.clevory.back.service.network.itf.InterfaceService;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class InterfaceServiceImpl implements InterfaceService {

    private InterfaceRepository interfaceRepository;

    @Override
    public List<Interface> getInterfaces() {
        return null;
    }

    @Override
    public List<Interface> deleteInterface(long id) {
        return null;
    }

    @Override
    public Interface getInterfaceById(long id) {
        return null;
    }

    @Override
    public Interface saveOrUpdate(Interface anInterface) {
        return null;
    }
}
