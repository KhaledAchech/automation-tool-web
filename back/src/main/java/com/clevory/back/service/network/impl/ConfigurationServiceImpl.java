package com.clevory.back.service.network.impl;

import com.clevory.back.model.network.Configuration;
import com.clevory.back.model.user.User;
import com.clevory.back.repository.network.ConfigurationRepository;
import com.clevory.back.service.network.itf.ConfigurationService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ConfigurationServiceImpl implements ConfigurationService {

    private ConfigurationRepository configurationRepository;

    @Override
    public List<Configuration> getConfigurations()
    {
        return configurationRepository.findAll();
    }

    @Override
    public List<Configuration> deleteConfiguration(long id)
    {
        configurationRepository.deleteById(id);
        return configurationRepository.findAll();
    }

    @Override
    public Configuration getConfigurationById(long id)
    {
        return configurationRepository.findById(id).get();
    }

    @Override
    public Configuration save(Configuration configuration) {
        configurationRepository.save(configuration);
        return configuration;
    }

    @Override
    public Configuration update(long id, Configuration configuration) {
        Configuration thisConfiguration = this.getConfigurationById(id);
        thisConfiguration.setDate(configuration.getDate());
        thisConfiguration.setStatus(configuration.getStatus());

        configurationRepository.save(thisConfiguration);
        return thisConfiguration;
    }

}
