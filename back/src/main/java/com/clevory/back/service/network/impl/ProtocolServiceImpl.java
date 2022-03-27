package com.clevory.back.service.network.impl;

import com.clevory.back.model.network.Interface;
import com.clevory.back.model.network.Protocol;
import com.clevory.back.repository.network.ProtocolRepository;
import com.clevory.back.service.network.itf.ProtocolService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ProtocolServiceImpl implements ProtocolService {

    private ProtocolRepository protocolRepository;

    @Override
    public List<Protocol> getProtocols()
    {
        return protocolRepository.findAll();
    }

    @Override
    public List<Protocol> deleteProtocol(long id)
    {
        protocolRepository.deleteById(id);
        return protocolRepository.findAll();
    }

    @Override
    public Protocol getProtocolById(long id)
    {
        return protocolRepository.findById(id).get();
    }

    @Override
    public Protocol save(Protocol protocol) {
        protocolRepository.save(protocol);
        return protocol;
    }

    @Override
    public Protocol update(long id, Protocol protocol) {
        Protocol thisProtocol = this.getProtocolById(id);
        thisProtocol.setName(protocol.getName());
        thisProtocol.setType(protocol.getType());
        thisProtocol.setConfiguration(protocol.getConfiguration());

        protocolRepository.save(thisProtocol);
        return thisProtocol;
    }

}
