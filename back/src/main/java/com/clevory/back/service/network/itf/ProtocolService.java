package com.clevory.back.service.network.itf;

import com.clevory.back.model.network.Protocol;
import com.clevory.back.model.network.Tenant;

import java.util.List;

public interface ProtocolService {
    List<Protocol> getProtocols();
    List<Protocol> deleteProtocol (long id);
    Protocol getProtocolById(long id);
    Protocol save(Protocol protocol);
    Protocol update(long id,Protocol protocol);
}
