package com.clevory.back.dto.network.response;

import com.clevory.back.dto.network.response.slim.TopologySlimDto;
import com.clevory.back.model.network.Topology;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class TenantResponseDto {

    @JsonProperty("id")
    private Long id;

    @JsonProperty("name")
    private String name;

    @JsonProperty("topologies")
    private List<TopologySlimDto> Topologies;
}
