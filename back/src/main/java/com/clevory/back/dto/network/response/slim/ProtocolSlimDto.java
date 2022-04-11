package com.clevory.back.dto.network.response.slim;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProtocolSlimDto {
    @JsonProperty("id")
    private long id;

    @JsonProperty("name")
    private String name;
}
