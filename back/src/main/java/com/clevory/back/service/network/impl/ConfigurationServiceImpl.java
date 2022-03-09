package com.clevory.back.service.network.impl;

import com.clevory.back.model.network.Configuration;
import com.clevory.back.repository.network.ConfigurationRepository;
import com.clevory.back.service.network.itf.ConfigurationService;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ConfigurationServiceImpl implements ConfigurationService {

    private ConfigurationRepository configurationRepository;

    @Override
    public List<Configuration> getConfigurations() {
        return null;
    }

    @Override
    public List<Configuration> deleteConfiguration(long id) {
        return null;
    }

    @Override
    public Configuration getConfigurationById(long id) {
        return null;
    }

    @Override
    public Configuration saveOrUpdate(Configuration configuration) {
        return null;
    }
}
