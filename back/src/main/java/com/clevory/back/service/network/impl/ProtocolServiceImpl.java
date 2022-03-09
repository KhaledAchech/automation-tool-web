package com.clevory.back.service.network.impl;

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
        return protocolRepository.getById(id);
    }

    @Override
    public Protocol saveOrUpdate(Protocol protocol)
    {
        protocolRepository.save(protocol);
        return protocol;
    }
}
