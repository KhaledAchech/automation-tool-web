package com.clevory.back.database.rethinkDb.context;

import com.clevory.back.database.rethinkDb.configuration.RethinkDBConnectionFactory;
import com.clevory.back.database.rethinkDb.configuration.RethinkDBInitializer;
import com.rethinkdb.RethinkDB;
import com.rethinkdb.gen.ast.Db;
import lombok.Getter;
import lombok.Setter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.concurrent.TimeoutException;

@Getter
@Setter
public class RethinkDBContext {

    protected final Logger log = LoggerFactory.getLogger(RethinkDBContext.class);
    private static final RethinkDB r = RethinkDB.r;

    private RethinkDBConnectionFactory rethinkDBConnectionFactory;
    private RethinkDBInitializer rethinkDBInitializer;

    private Db database;
    private String table;

    public RethinkDBContext (
            RethinkDBConnectionFactory rethinkDBConnectionFactory,
            RethinkDBInitializer rethinkDBInitializer,
            String table
    )
    {
        this.rethinkDBConnectionFactory = rethinkDBConnectionFactory;
        this.rethinkDBInitializer = rethinkDBInitializer;

        this.database = r.db(this.rethinkDBInitializer.getDbName());
        this.table = table;
        try {
            this.rethinkDBInitializer.createTable(this.table);
        } catch (TimeoutException e) {
            e.printStackTrace();
        }
    }


    public Object create(Object object) throws TimeoutException
    {
        Object run = this.database.table(this.table).insert(object)
                .run(rethinkDBConnectionFactory.createConnection());

        log.info("Insert {}", run);
        return object;
    }
}
