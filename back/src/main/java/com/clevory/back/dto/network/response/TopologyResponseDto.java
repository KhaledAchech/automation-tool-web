package com.clevory.back.dto.network.response;

import com.clevory.back.dto.network.response.slim.DeviceSlimDto;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class TopologyResponseDto {
    @JsonProperty("id")
    private long id;

    @JsonProperty("name")
    private String name;

    @JsonProperty("type")
    private String type;

    @JsonProperty("devices")
    private Set<DeviceSlimDto> devices;
}
