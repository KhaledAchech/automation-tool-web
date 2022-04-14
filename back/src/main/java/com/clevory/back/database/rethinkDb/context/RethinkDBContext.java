package com.clevory.back.database.rethinkDb.context;

import com.clevory.back.database.rethinkDb.configuration.RethinkDBConnectionFactory;
import com.clevory.back.database.rethinkDb.configuration.RethinkDBInitializer;
import com.rethinkdb.RethinkDB;
import com.rethinkdb.gen.ast.Db;
import com.rethinkdb.net.Cursor;
import lombok.Getter;
import lombok.Setter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;
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


    public List<Object> getAll() throws TimeoutException
    {
        List<Object> objects = new ArrayList<>();
        Cursor cursor = this.database.table(this.table)
                .run(rethinkDBConnectionFactory.createConnection());

        for (Object doc : cursor) {

            objects.add(doc);
        }

        log.info("Read {}", objects);
        return objects;
    }

    public Object create(Object object) throws TimeoutException
    {
        Object run = this.database.table(this.table).insert(object)
                .run(rethinkDBConnectionFactory.createConnection());

        log.info("Insert {}", run);
        return object;
    }

    public Object getByID (String id) throws TimeoutException
    {
        Object object = this.database.table(this.table).get(id)
                .run(rethinkDBConnectionFactory.createConnection());

        log.info("Read {}", object);
        return object;
    }

    public Object update (String id, Object object) throws TimeoutException
    {
       Object run =  this.database.table(this.table)
                    .filter(row -> row.g("id").eq(id))
                    .update(object).run(rethinkDBConnectionFactory.createConnection());

        log.info("Update {}", run);
        return object;
    }

    public Object delete (String id) throws TimeoutException
    {
        Object object = this.database.table(this.table).get(id)
                        .run(rethinkDBConnectionFactory.createConnection());

        Object run =  this.database.table(this.table).get(id)
                .delete().run(rethinkDBConnectionFactory.createConnection());

        log.info("Delete {}", run);
        return object;
    }
}
