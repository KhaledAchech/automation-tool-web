package com.clevory.back.repository.editor;

import com.clevory.back.database.rethinkDb.configuration.RethinkDBConnectionFactory;
import com.clevory.back.database.rethinkDb.context.RethinkDBContext;
import com.clevory.back.database.rethinkDb.context.RethinkDBContextFactory;
import com.clevory.back.model.editor.Link;
import com.clevory.back.model.editor.Node;
import com.rethinkdb.RethinkDB;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.concurrent.TimeoutException;

@Repository
public class LinkRepository {

    private final String table = Link.class.getSimpleName().toLowerCase();
    private final RethinkDBContextFactory dbContextFactory;
    private final RethinkDBContext dbContext;
    private Link link = new Link();

    private static final RethinkDB r = RethinkDB.r;
    private RethinkDBConnectionFactory rethinkDBConnectionFactory;

    public LinkRepository(
            RethinkDBContextFactory dbContextFactory,
            RethinkDBConnectionFactory rethinkDBConnectionFactory)
    {
        this.dbContextFactory = dbContextFactory;
        this.dbContext = this.dbContextFactory.createMyDBContext(table,link);
        this.rethinkDBConnectionFactory = rethinkDBConnectionFactory;
    }


    public Object save(Link link)
    {
        try {
            return dbContext.create(link);
        } catch (TimeoutException e) {
            e.printStackTrace();
        }
        return null;
    }

    public List<Object> getAll()
    {
        try {
            return dbContext.getAll();
        } catch (TimeoutException e) {
            e.printStackTrace();
        }
        return null;
    }


    public Object getById(String id)
    {
        try {
            return dbContext.getByID(id);
        } catch (TimeoutException e) {
            e.printStackTrace();
        }
        return null;
    }

    public Object update(String id, Link link)
    {
        try {
            return dbContext.update(id,link);
        } catch (TimeoutException e) {
            e.printStackTrace();
        }
        return null;
    }

    public Object delete(String id)
    {
        try {
            return dbContext.delete(id);
        } catch (TimeoutException e) {
            e.printStackTrace();
        }
        return null;
    }

    public Object replace(Link link, long DiagramId)
    {
        try {
            Object run = this.dbContext.getDatabase().table(table)
                    .filter(row -> row.g("key").eq(link.getKey()))
                    .update(
                            r.hashMap("key", link.getKey())
                                    .with("from", link.getFrom())
                                    .with("to", link.getTo())
                                    .with("diagramId", DiagramId)
                    )
                    .run(this.rethinkDBConnectionFactory.createConnection());

            this.dbContext.getLog().info("replace {}", run);
        } catch (TimeoutException e) {
            e.printStackTrace();
        }
        return null;
    }
}
