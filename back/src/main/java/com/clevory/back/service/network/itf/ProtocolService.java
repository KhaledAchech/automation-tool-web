package com.clevory.back.service.network.itf;

import com.clevory.back.model.network.Protocol;

import java.util.List;

public interface ProtocolService {
    List<Protocol> getProtocols();
    List<Protocol> deleteProtocol (long id);
    Protocol getProtocolById(long id);
    Protocol saveOrUpdate(Protocol protocol);
}
