package com.clevory.back.repository.network;

import com.clevory.back.model.network.Configuration;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConfigurationRepository extends JpaRepository<Configuration, Long> {
}
