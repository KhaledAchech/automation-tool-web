package com.clevory.back.dto.network.response.slim;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InterfaceSlimDto {

    @JsonProperty("id")
    private Long id;

    @JsonProperty("ipAddress")
    private String ipAddress;

    @JsonProperty("type")
    private String type;
}
