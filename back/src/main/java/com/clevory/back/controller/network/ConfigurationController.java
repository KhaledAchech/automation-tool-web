package com.clevory.back.controller.network;

import com.clevory.back.model.network.Configuration;
import com.clevory.back.service.network.itf.ConfigurationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public Configuration createOrUpdate (@RequestBody Configuration configuration) {return configurationService.saveOrUpdate(configuration);}

    @DeleteMapping("/{id}")
    public List<Configuration> deleteById(@PathVariable("id") long id) {return configurationService.deleteConfiguration(id);}
}
