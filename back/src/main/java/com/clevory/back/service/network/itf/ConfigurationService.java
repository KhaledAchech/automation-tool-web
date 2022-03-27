package com.clevory.back.service.network.itf;

import com.clevory.back.model.network.Configuration;
import com.clevory.back.model.network.Device;

import java.util.List;

public interface ConfigurationService {
    List<Configuration> getConfigurations();
    List<Configuration> deleteConfiguration(long id);
    Configuration getConfigurationById(long id);
    Configuration save(Configuration configuration);
    Configuration update(long id,Configuration configuration);
}
