package com.clevory.back.controller.network;

import com.clevory.back.model.network.Interface;
import com.clevory.back.service.network.itf.InterfaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/interfaces")
public class InterfaceController {

    private InterfaceService interfaceService;
    @Autowired
    public InterfaceController(InterfaceService interfaceService)
    {
        super();
        this.interfaceService = interfaceService;
    }

    @GetMapping
    public List<Interface> getAll()
    {
        return interfaceService.getInterfaces();
    }

    @GetMapping("/{id}")
    public Interface getById(@PathVariable long id)
    {
        return interfaceService.getInterfaceById(id);
    }

    @PostMapping
    public Interface createOrUpdate (@RequestBody Interface anInterface) {return interfaceService.saveOrUpdate(anInterface);}

    @DeleteMapping("/{id}")
    public List<Interface> deleteById(@PathVariable("id") long id) {return interfaceService.deleteInterface(id);}
}
