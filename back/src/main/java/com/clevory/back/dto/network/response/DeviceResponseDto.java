package com.clevory.back.dto.network.response;

import com.clevory.back.commun.Type;
import com.clevory.back.dto.network.response.slim.InterfaceSlimDto;
import com.clevory.back.dto.network.response.slim.ProtocolSlimDto;
import com.clevory.back.dto.network.response.slim.TopologySlimDto;
import com.clevory.back.model.network.Device;
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

    @JsonProperty("ipAddress")
    private String ipAddress;

    @JsonProperty("hostname")
    private String hostname;

    @JsonProperty("type")
    private Type type;

    @JsonProperty("os")
    private String os;

    @JsonProperty("vendor")
    private String vendor;

    @JsonProperty("status")
    private String status;

    @JsonProperty("isAssigned")
    private boolean isAssigned;

    /*@JsonProperty("topologies")
    private Set<TopologySlimDto> topologies;*/

    @JsonProperty("interfaces")
    private Set<InterfaceSlimDto> interfaces;

    @JsonProperty("protocols")
    private Set<ProtocolSlimDto> protocols;

}
