package com.clevory.back.database.rethinkDb.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


import javax.annotation.PostConstruct;

@Configuration
public class RethinkDBConfiguration {

    public static String DBHOST = "localhost" ;

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