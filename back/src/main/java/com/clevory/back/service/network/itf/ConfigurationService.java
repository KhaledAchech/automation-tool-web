package com.clevory.back.service.network.itf;

import com.clevory.back.model.network.Configuration;

import java.util.List;

public interface ConfigurationService {
    List<Configuration> getConfigurations();
    List<Configuration> deleteConfiguration(long id);
    Configuration getConfigurationById(long id);
    Configuration saveOrUpdate(Configuration configuration);
}
