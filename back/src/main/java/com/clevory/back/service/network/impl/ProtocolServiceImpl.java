package com.clevory.back.service.network.impl;

import com.clevory.back.model.network.Protocol;
import com.clevory.back.repository.network.ProtocolRepository;
import com.clevory.back.service.network.itf.ProtocolService;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ProtocolServiceImpl implements ProtocolService {
    private ProtocolRepository protocolRepository;

    @Override
    public List<Protocol> getProtocols() {
        return null;
    }

    @Override
    public List<Protocol> deleteProtocol(long id) {
        return null;
    }

    @Override
    public Protocol getProtocolById(long id) {
        return null;
    }

    @Override
    public Protocol saveOrUpdate(Protocol protocol) {
        return null;
    }
}
