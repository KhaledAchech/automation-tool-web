package com.clevory.back.service.network.impl;

import com.clevory.back.model.network.Interface;
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
        interfaceRepository.deleteById(id);
        return interfaceRepository.findAll();
    }

    @Override
    public Interface getInterfaceById(long id)
    {
        return interfaceRepository.getById(id);
    }

    @Override
    public Interface saveOrUpdate(Interface anInterface) {
        interfaceRepository.save(anInterface);
        return anInterface;
    }
}
