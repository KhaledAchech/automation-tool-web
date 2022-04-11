package com.clevory.back.dto.network.response.slim;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DeviceSlimDto {

    @JsonProperty("id")
    private Long id;

    @JsonProperty("name")
    private String name;
}
