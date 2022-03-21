package com.clevory.back.controller.network;

import com.clevory.back.model.network.Configuration;
import com.clevory.back.service.network.itf.ConfigurationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/configurations")
public class ConfigurationController {

    private ConfigurationService configurationService;
    @Autowired
    public ConfigurationController(ConfigurationService configurationService)
    {
        super();
        this.configurationService = configurationService;
    }

    @GetMapping
    public List<Configuration> getAll()
    {
        return configurationService.getConfigurations();
    }

    @GetMapping("/{id}")
    public Configuration getById(@PathVariable long id)
    {
        return configurationService.getConfigurationById(id);
    }

    @PostMapping
    public Configuration create (@RequestBody Configuration configuration) {return configurationService.save(configuration);}

    @PutMapping("/{id}")
    public Configuration update (@PathVariable("id") long id, @RequestBody  Configuration configuration) {
        return configurationService.update(id, configuration);
    }

    @DeleteMapping("/{id}")
    public List<Configuration> deleteById(@PathVariable("id") long id) {return configurationService.deleteConfiguration(id);}
}
