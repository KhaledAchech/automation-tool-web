package com.clevory.back.service.network.itf;

import com.clevory.back.model.network.Interface;

import java.util.List;

public interface InterfaceService {
    List<Interface> getInterfaces();
    List<Interface> deleteInterface(long id);
    Interface getInterfaceById(long id);
    Interface saveOrUpdate(Interface anInterface);
}
