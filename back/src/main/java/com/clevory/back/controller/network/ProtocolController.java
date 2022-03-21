package com.clevory.back.controller.network;

import com.clevory.back.model.network.Protocol;
import com.clevory.back.service.network.itf.ProtocolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/protocols")
public class ProtocolController {

    private ProtocolService protocolService;
    @Autowired
    public ProtocolController(ProtocolService protocolService)
    {
        super();
        this.protocolService = protocolService;
    }

    @GetMapping
    public List<Protocol> getAll()
    {
        return protocolService.getProtocols();
    }

    @GetMapping("/{id}")
    public Protocol getById(@PathVariable long id)
    {
        return protocolService.getProtocolById(id);
    }

    @PostMapping
    public Protocol creat (@RequestBody Protocol protocol) {return protocolService.save(protocol);}

    @PutMapping("/{id}")
    public Protocol update (@PathVariable("id") long id, @RequestBody  Protocol protocol) {
        return protocolService.update(id, protocol);
    }

    @DeleteMapping("/{id}")
    public List<Protocol> deleteById(@PathVariable("id") long id) {return protocolService.deleteProtocol(id);}
}
