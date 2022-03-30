package com.clevory.back.dto.network.response;

import com.clevory.back.dto.network.response.slim.InterfaceSlimDto;
import com.clevory.back.dto.network.response.slim.ProtocolSlimDto;
import com.clevory.back.dto.network.response.slim.TopologySlimDto;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Getter
@Setter
public class DeviceResponseDto {

    @JsonProperty("id")
    private Long id;

    @JsonProperty("name")
    private String name;

    @JsonProperty("topologies")
    private Set<TopologySlimDto> topologies;

    @JsonProperty("interfaces")
    private Set<InterfaceSlimDto> interfaces;

    @JsonProperty("protocols")
    private Set<ProtocolSlimDto> protocols;
}
