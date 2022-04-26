package com.clevory.back.repository.editor;

import com.clevory.back.database.rethinkDb.configuration.RethinkDBConnectionFactory;
import com.clevory.back.database.rethinkDb.context.RethinkDBContext;
import com.clevory.back.database.rethinkDb.context.RethinkDBContextFactory;
import com.clevory.back.model.editor.Diagram;
import com.clevory.back.model.editor.Link;
import com.clevory.back.model.editor.Node;
import com.rethinkdb.RethinkDB;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeoutException;

@Repository
public class DiagramRepository {
    private final String table = Diagram.class.getSimpleName().toLowerCase();
    private final RethinkDBContextFactory dbContextFactory;
    private final RethinkDBContext dbContext;
    private Diagram diagram = new Diagram();

    private static final RethinkDB r = RethinkDB.r;
    private RethinkDBConnectionFactory rethinkDBConnectionFactory;

    @Autowired
    public DiagramRepository(RethinkDBContextFactory dbContextFactory,
                             RethinkDBConnectionFactory rethinkDBConnectionFactory) {
        this.dbContextFactory = dbContextFactory;
        this.dbContext = this.dbContextFactory.createMyDBContext(table,diagram);
        this.rethinkDBConnectionFactory = rethinkDBConnectionFactory;
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

    public Object update(String id, Diagram diagram)
    {
        try {
            return dbContext.update(id,diagram);
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

    public String create (Diagram diagram)
    {
        List nodes = new ArrayList<>();
        List links = new ArrayList<>();

        for (Node node: diagram.getNodes())
        {

            nodes.add(
                    r.hashMap("key", node.getKey())
                            .with("text", node.getText())
                            .with("type", node.getType())
                            .with("loc", "0 0")
                            .with("diagramId", diagram.getDiagramId()));
        }

        for (Link link : diagram.getLinks())
        {
            links.add(
                    r.hashMap("key", link.getKey())
                            .with("from", link.getFrom())
                            .with("to", link.getTo())
                            .with("diagramId", diagram.getDiagramId()));
        }


        try {
            Object run = this.dbContext.getDatabase().table(table).insert(r.array(
                    r.hashMap("diagram name", diagram.getName())
                            .with("nodes",r.array(nodes))
                            .with("links",r.array(links))
            )).run(this.rethinkDBConnectionFactory.createConnection());

            this.dbContext.getLog().info("insert {}", run);

            return "Diagram created successfully !";
        } catch (TimeoutException e) {
            e.printStackTrace();
        }
        return "Diagram was not created, an error has been detected.";
    }

    public ArrayList<Node> getDiagramNodes(String id)
    {
        try {
            ArrayList nodes = this.dbContext.getDatabase().table(table).get(id).
                    getField("nodes")
                    .coerceTo("array")
                    .run(this.rethinkDBConnectionFactory.createConnection());

            this.dbContext.getLog().info("read {}", nodes.get(0));

            return (ArrayList<Node>) nodes.get(0);
        } catch (TimeoutException ex) {
            ex.printStackTrace();
        }
        return null;
    }
    public ArrayList<Link> getDiagramLinks(String id)
    {
        try {
            ArrayList links = this.dbContext.getDatabase().table(table).get(id).
                    getField("links")
                    .coerceTo("array")
                    .run(this.rethinkDBConnectionFactory.createConnection());

            this.dbContext.getLog().info("read {}", links.get(0));

            return (ArrayList<Link>) links.get(0);
        } catch (TimeoutException ex) {
            ex.printStackTrace();
        }
        return null;
    }
}
