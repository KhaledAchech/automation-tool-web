package com.clevory.back.controller.network.editor;

import com.clevory.back.database.rethinkDb.context.RethinkDBContext;
import com.clevory.back.database.rethinkDb.context.RethinkDBContextFactory;
import com.clevory.back.model.network.TestTopology;
import com.clevory.back.service.editor.itf.TestTopologyService;
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

    private RethinkDBContextFactory dbContextFactory;

    private TestTopologyService testTopologyService;

    private RethinkDBContext dbContext;

    public EditorTopologyController(
            RethinkDBContextFactory dbContextFactory,
            TestTopologyService testTopologyService
    )
    {
        this.dbContextFactory = dbContextFactory;
        this.testTopologyService = testTopologyService;
    }

    @RequestMapping(method = RequestMethod.POST)
    public TestTopology insertTopology(@RequestBody TestTopology topology) throws TimeoutException {
        return testTopologyService.save(topology);
    }

    /*@RequestMapping(method = RequestMethod.GET)
    public List<Object> getTopologies() throws TimeoutException {

        List<Object> topologies = new ArrayList<>();
        Cursor cursor = r.db(rethinkDBInitializer.getDbName()).table("topology").run(connectionFactory.createConnection());

        for (Object doc : cursor) {

            topologies.add(doc);
        }
        System.out.println(r.getClass().getSimpleName());
        return topologies;
    }*/
}
