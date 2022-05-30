package com.clevory.back.dto.mapper.impl;

import com.clevory.back.dto.mapper.itf.DiagramStructMapper;
import com.clevory.back.model.editor.Node;
import com.clevory.back.model.network.Device;
import org.springframework.stereotype.Component;

@Component
public class DiagramStructMapperImpl implements DiagramStructMapper {
    @Override
    public Node DeviceToNodeDTO(Device device) {
        if ( device == null ) {
            return null;
        }

        Node node = new Node();
        node.setKey(Long.toString(device.getId()));
        node.setText(device.getHostname());
        node.setType(device.getType());

        return node;
    }
}
