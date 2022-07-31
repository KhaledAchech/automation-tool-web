package com.clevory.back.service.network.impl;

import com.clevory.back.model.network.Device;
import com.clevory.back.model.network.Interface;
import com.clevory.back.model.network.Protocol;
import com.clevory.back.model.network.Topology;
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
        Protocol protocol = protocolRepository.findById(id).get();

        for (Device device : protocol.getDevices())
            {
                System.out.println(device.getDeviceProtocols());
                device.getDeviceProtocols().remove(protocol);
            }

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
        if (protocol.getName()!=null)
            thisProtocol.setName(protocol.getName());
        if (protocol.getType()!=null)
            thisProtocol.setType(protocol.getType());
        if (protocol.getConfiguration()!=null)
            thisProtocol.setConfiguration(protocol.getConfiguration());

        protocolRepository.save(thisProtocol);
        return thisProtocol;
    }

}
