package com.clevory.back.dto.mapper.itf;

import com.clevory.back.model.editor.Node;
import com.clevory.back.model.network.Device;

public interface DiagramStructMapper {

    Node DeviceToNodeDTO(Device device);
    //Device NodeToDeviceDTO(Node node);
}
