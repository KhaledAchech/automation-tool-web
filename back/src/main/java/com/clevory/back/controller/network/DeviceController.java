package com.clevory.back.controller.network;

import com.clevory.back.dto.network.response.DeviceResponseDto;
import com.clevory.back.dto.network.response.TenantResponseDto;
import com.clevory.back.dto.network.response.TopologyResponseDto;
import com.clevory.back.model.network.Device;
import com.clevory.back.model.network.Interface;
import com.clevory.back.model.network.Protocol;
import com.clevory.back.service.network.itf.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@CrossOrigin(origins = "http://localhost:4200")
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
    public DeviceResponseDto create (@RequestBody Device device) {return deviceService.save(device);}

    @PutMapping("/{id}")
    public Device update (@PathVariable("id") long id, @RequestBody  Device device) {
        return deviceService.update(id, device);
    }

    @DeleteMapping("/{id}")
    public List<Device> deleteById(@PathVariable("id") long id) {return deviceService.deleteDevice(id);}

    @GetMapping("/details")
    public List<DeviceResponseDto> getDetails ()
    {
        return deviceService.getDeviceWithDetails();
    }

    @PostMapping("/{id}/addInterface")
    public DeviceResponseDto addInterface (@PathVariable("id") long id, @RequestBody Interface anInterface) {return deviceService.addInterfaceToDevice(id, anInterface);}

    @PostMapping("/{id}/addProtocol")
    public DeviceResponseDto addProtocol (@PathVariable("id") long id, @RequestBody Protocol protocol) {return deviceService.addProtocolToDevice(id, protocol);}

    @GetMapping("/protocols/{id}")
    public Set<Protocol> getDeviceProtocols (@PathVariable("id") long id)
    {
        return deviceService.getDeviceProtocols(id);
    }

    @GetMapping("/interfaces/{id}")
    public Set<Interface> getDeviceInterface (@PathVariable("id") long id)
    {
        return deviceService.getDeviceInterfaces(id);
    }
}
