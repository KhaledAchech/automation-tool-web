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
import com.rethinkdb.model.MapObject;


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

    private NodeRepository nodeRepository;
    private LinkRepository linkRepository;

    @Autowired
    public DiagramRepository(RethinkDBContextFactory dbContextFactory,
                             RethinkDBConnectionFactory rethinkDBConnectionFactory,
                             NodeRepository nodeRepository,
                             LinkRepository linkRepository) {
        this.dbContextFactory = dbContextFactory;
        this.dbContext = this.dbContextFactory.createMyDBContext(table,diagram);
        this.rethinkDBConnectionFactory = rethinkDBConnectionFactory;
        this.nodeRepository = nodeRepository;
        this.linkRepository = linkRepository;
    }

    public Object save(Diagram diagram)
    {
        try {
            return dbContext.create(diagram);
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
            nodeRepository.save(node);
            nodes.add(
                    r.hashMap("key", node.getKey())
                            .with("text", node.getText())
                            .with("type", node.getType().name())
                            .with("loc", "0 0")
                            .with("diagramId", diagram.getDiagramId()));
        }

        for (Link link : diagram.getLinks())
        {
            linkRepository.save(link);
            links.add(
                    r.hashMap("key", link.getKey())
                            .with("from", link.getFrom())
                            .with("to", link.getTo())
                            .with("diagramId", diagram.getDiagramId()));
        }

        try {
            Object run = this.dbContext.getDatabase().table(table).insert(r.array(
                    r.hashMap("diagram name", diagram.getName())
                            .with("nodes",nodes)
                            .with("links",links)
            )).run(this.rethinkDBConnectionFactory.createConnection());

            this.dbContext.getLog().info("insert {}", run);

            return "Diagram created successfully !";
        } catch (TimeoutException e) {
            e.printStackTrace();
        }
        return "Diagram was not created, an error has been detected.";
    }

    public String addNode (Node node, Long diagramID)
    {
        try {
            node.setDiagramId(diagramID);
            nodeRepository.save(node);

            MapObject newNode = r.hashMap("diagramId", diagramID)
                                    .with("key", node.getKey())
                                    .with("text", node.getText())
                                    .with("type", node.getType().name());

            Object run = this.dbContext.getDatabase().table(table)
                    .filter(row -> row.g("diagramId").eq(diagramID))
                    .update(row -> r.hashMap
                            ("nodes",row.g("nodes").append(newNode))
                    ).run(this.rethinkDBConnectionFactory.createConnection());

            this.dbContext.getLog().info("update {}", run);
            return "Node Assigned successfully !";

        } catch (TimeoutException e) {
            e.printStackTrace();
        }
        return "Node wasn't added, an error has been detected.";
    }

    public ArrayList<Node> getDiagramNodes(long id)
    {
        try {
            ArrayList nodes = this.dbContext.getDatabase().table(table)
                    .filter(row -> row.g("diagramId").eq(id))
                    .getField("nodes")
                    .coerceTo("array")
                    .run(this.rethinkDBConnectionFactory.createConnection());

            this.dbContext.getLog().info("read {}", nodes.get(0));

            return (ArrayList<Node>) nodes.get(0);
        } catch (TimeoutException ex) {
            ex.printStackTrace();
        }
        return null;
    }
    public ArrayList<Link> getDiagramLinks(long id)
    {
        try {
            ArrayList links = this.dbContext.getDatabase().table(table)
                    .filter(row -> row.g("diagramId").eq(id))
                    .getField("links")
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
