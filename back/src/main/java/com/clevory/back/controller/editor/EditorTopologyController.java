package com.clevory.back.controller.editor;

import com.clevory.back.database.rethinkDb.context.RethinkDBContext;
import com.clevory.back.database.rethinkDb.context.RethinkDBContextFactory;
import com.clevory.back.model.editor.TestTopology;
import com.clevory.back.service.editor.itf.TestTopologyService;
import org.springframework.web.bind.annotation.*;

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

    @RequestMapping(method = RequestMethod.GET)
    public List<Object> getTopologies() throws TimeoutException {
        return testTopologyService.getAll();
    }

    @GetMapping("/{id}")
    public Object getTopology(@PathVariable String id) throws TimeoutException {
        return testTopologyService.getById(id);
    }

    @PutMapping("/{id}")
    public Object updateTopology(@PathVariable String id,@RequestBody TestTopology topology) throws TimeoutException {
        return testTopologyService.update(id,topology);
    }

    @DeleteMapping("/{id}")
    public Object deleteTopology(@PathVariable String id) throws TimeoutException
    {
        return testTopologyService.delete(id);
    }
}
