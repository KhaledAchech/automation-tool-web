package com.clevory.back.controller.editor;

import com.clevory.back.model.editor.Diagram;
import com.clevory.back.model.network.Configuration;
import com.clevory.back.service.editor.itf.DiagramService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.TimeoutException;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/editor/diagram")
public class DiagramController {

    private DiagramService diagramService;

    public DiagramController( DiagramService diagramService)
    {
        this.diagramService=diagramService;
    }

    @PostMapping
    public String create (@RequestBody Diagram diagram)
    {
        return diagramService.save(diagram);
    }
    @PutMapping("/{id}")
    public Object update (@PathVariable("id") String id, @RequestBody  Diagram diagram) {
        return diagramService.update(id, diagram);
    }

    @GetMapping
    public List<Object> getAll()
    {
        return diagramService.getAll();
    }

    @GetMapping("/{id}")
    public Object getDiagram(@PathVariable String id)
    {
        return diagramService.getById(id);
    }

    @DeleteMapping("/{id}")
    public Object deleteDiagram(@PathVariable String id)
    {
        return diagramService.delete(id);
    }
}
