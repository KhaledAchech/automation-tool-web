package com.clevory.back.controller.network;

import com.clevory.back.model.network.Device;
import com.clevory.back.service.network.itf.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/devices")
public class DeviceController {

    private DeviceService deviceService;
    @Autowired
    public DeviceController(DeviceService deviceService)
    {
        super();
        this.deviceService = deviceService;
    }

    @GetMapping
    public List<Device> getAll()
    {
        return deviceService.getDevices();
    }

    @GetMapping("/{id}")
    public Device getById(@PathVariable long id)
    {
        return deviceService.getDeviceById(id);
    }

    @PostMapping
    public Device createOrUpdate (@RequestBody Device device) {return deviceService.saveOrUpdate(device);}

    @DeleteMapping("/{id}")
    public List<Device> deleteById(@PathVariable("id") long id) {return deviceService.deleteDevice(id);}
}
