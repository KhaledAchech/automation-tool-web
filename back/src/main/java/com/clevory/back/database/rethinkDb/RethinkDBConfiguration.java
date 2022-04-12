package com.clevory.back.database.rethinkDb;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

import javax.annotation.PostConstruct;

@Configuration
public class RethinkDBConfiguration {

    @Autowired
    private Environment env;

    public static String DBHOST = "localhost";

    @PostConstruct
    public void init() {
        this.DBHOST = "localhost";
    }

    @Bean
    public RethinkDBConnectionFactory connectionFactory() {
        return new RethinkDBConnectionFactory(DBHOST);
    }

    @Bean
    RethinkDBInitializer rethinkDBInitializer() {
        return new RethinkDBInitializer();
    }
}