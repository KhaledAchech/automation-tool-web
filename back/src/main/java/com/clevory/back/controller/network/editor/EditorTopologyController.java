package com.clevory.back.controller.network.editor;

import com.clevory.back.database.rethinkDb.configuration.RethinkDBConnectionFactory;
import com.clevory.back.database.rethinkDb.configuration.RethinkDBInitializer;
import com.clevory.back.database.rethinkDb.context.RethinkDBContext;
import com.clevory.back.model.network.TestTopology;
import com.rethinkdb.RethinkDB;
import com.rethinkdb.net.Cursor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeoutException;

@RestController
@RequestMapping("/editor")
public class EditorTopologyController {
    protected final Logger log = LoggerFactory.getLogger(EditorTopologyController.class);
    private static final RethinkDB r = RethinkDB.r;

    @Autowired
    private RethinkDBConnectionFactory connectionFactory;

    @Autowired
    private RethinkDBInitializer rethinkDBInitializer;

    @Autowired
    private RethinkDBContext rethinkDBContext;

    @RequestMapping(method = RequestMethod.POST)
    public Object insertTopology(@RequestBody TestTopology topology) throws TimeoutException {
        return rethinkDBContext.create(topology);
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Object> getTopologies() throws TimeoutException {

        List<Object> topologies = new ArrayList<>();
        Cursor cursor = r.db(rethinkDBInitializer.getDbName()).table("topology").run(connectionFactory.createConnection());

        for (Object doc : cursor) {

            topologies.add(doc);
        }
        System.out.println(r.getClass().getSimpleName());
        return topologies;
    }
}
