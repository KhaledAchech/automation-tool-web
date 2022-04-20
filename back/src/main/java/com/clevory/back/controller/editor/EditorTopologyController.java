package com.clevory.back.controller.editor;

import com.clevory.back.model.editor.TestTopology;
import com.clevory.back.service.editor.itf.TestTopologyService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.TimeoutException;

@RestController
@RequestMapping("/editor/test")
public class EditorTopologyController {

    private TestTopologyService testTopologyService;

    public EditorTopologyController(TestTopologyService testTopologyService)
    {
        this.testTopologyService = testTopologyService;
    }

    @RequestMapping(method = RequestMethod.POST)
    public TestTopology insertTopology(@RequestBody TestTopology testTopology)
    {
        return testTopologyService.save(testTopology);
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Object> getTopologies()
    {
        return testTopologyService.getAll();
    }

    @GetMapping("/{id}")
    public Object getTopology(@PathVariable String id)
    {
        return testTopologyService.getById(id);
    }

    @PutMapping("/{id}")
    public Object updateTopology(@PathVariable String id,@RequestBody TestTopology topology)
    {
        return testTopologyService.update(id,topology);
    }

    @DeleteMapping("/{id}")
    public Object deleteTopology(@PathVariable String id)
    {
        return testTopologyService.delete(id);
    }
}
