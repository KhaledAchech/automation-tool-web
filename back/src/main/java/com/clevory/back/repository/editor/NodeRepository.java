package com.clevory.back.repository.editor;

import com.clevory.back.database.rethinkDb.context.RethinkDBContext;
import com.clevory.back.database.rethinkDb.context.RethinkDBContextFactory;
import com.clevory.back.model.editor.Node;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.concurrent.TimeoutException;

@Repository
public class NodeRepository {
    private final String table = Node.class.getSimpleName().toLowerCase();
    private final RethinkDBContextFactory dbContextFactory;
    private final RethinkDBContext dbContext;
    private Node node = new Node();

    public NodeRepository(RethinkDBContextFactory dbContextFactory) {
        this.dbContextFactory = dbContextFactory;
        this.dbContext = this.dbContextFactory.createMyDBContext(table,node);
    }


    public Object save(Node node)
    {
        try {
            return dbContext.create(node);
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

    public Object update(String id, Node node)
    {
        try {
            return dbContext.update(id,node);
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
}
