package com.clevory.back.database.rethinkDb.context;

import com.clevory.back.database.rethinkDb.configuration.RethinkDBConnectionFactory;
import com.clevory.back.database.rethinkDb.configuration.RethinkDBInitializer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RethinkDBContextFactory {

    private RethinkDBConnectionFactory rethinkDBConnectionFactory;
    private RethinkDBInitializer rethinkDBInitializer;

    @Autowired
    public RethinkDBContextFactory(
            RethinkDBConnectionFactory rethinkDBConnectionFactory,
            RethinkDBInitializer rethinkDBInitializer
    )
    {
        this.rethinkDBConnectionFactory = rethinkDBConnectionFactory;
        this.rethinkDBInitializer = rethinkDBInitializer;
    }

    public RethinkDBContext createMyDBContext(String table, Object forEntity)
    {
        return new RethinkDBContext(this.rethinkDBConnectionFactory, this.rethinkDBInitializer, table, forEntity);
    }
}
