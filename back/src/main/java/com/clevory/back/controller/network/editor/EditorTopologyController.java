package com.clevory.back.controller.network.editor;

import com.clevory.back.database.rethinkDb.RethinkDBConnectionFactory;
import com.clevory.back.database.rethinkDb.RethinkDBInitializer;
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

    @RequestMapping(method = RequestMethod.POST)
    public Object insertTopology(@RequestBody Object topology) throws TimeoutException {
        Object run = r.db(rethinkDBInitializer.getDbName()).table("topology").insert(topology)
                .run(connectionFactory.createConnection());

        log.info("Insert {}", run);
        return topology;
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Object> getTopologies() throws TimeoutException {
        System.out.println("Get Request starts here : ");
        List<Object> topologies = new ArrayList<>();
        Cursor cursor = r.db(rethinkDBInitializer.getDbName()).table("topology").run(connectionFactory.createConnection());
        for (Object doc : cursor) {
            System.out.println(doc);
            topologies.add(doc);
        }
        return topologies;
    }
}
