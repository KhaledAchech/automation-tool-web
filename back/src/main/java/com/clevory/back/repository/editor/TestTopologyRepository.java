package com.clevory.back.repository.editor;

import com.clevory.back.database.rethinkDb.context.RethinkDBContext;
import com.clevory.back.database.rethinkDb.context.RethinkDBContextFactory;
import com.clevory.back.model.network.TestTopology;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.concurrent.TimeoutException;

@Repository
public class TestTopologyRepository{

    private final String table = TestTopology.class.getSimpleName().toLowerCase();
    private final RethinkDBContextFactory dbContextFactory;
    private final RethinkDBContext dbContext;

    @Autowired
    public TestTopologyRepository(RethinkDBContextFactory dbContextFactory) {
        this.dbContextFactory = dbContextFactory;
        this.dbContext = this.dbContextFactory.createMyDBContext(table);
    }

    public TestTopology create (TestTopology testTopology)
    {
        try {
            return (TestTopology)dbContext.create(testTopology);
        } catch (TimeoutException e) {
            e.printStackTrace();
        }
        return null;
    }
}
