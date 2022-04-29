package com.clevory.back.controller.editor;

import com.clevory.back.commun.wrapper.StringResponse;
import com.clevory.back.model.editor.Diagram;
import com.clevory.back.model.editor.Link;
import com.clevory.back.model.editor.Node;
import com.clevory.back.service.editor.itf.DiagramService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/editor/diagram")
public class DiagramController {

    private DiagramService diagramService;

    public DiagramController( DiagramService diagramService)
    {
        this.diagramService=diagramService;
    }

    //initialize an empty diagram
    @PostMapping("/init")
    public Object save (@RequestBody Diagram diagram)
    {
        return diagramService.save(diagram);
    }

    //Create a diagram with nodes and links
    @PostMapping
    public String create (@RequestBody Diagram diagram)
    {
        return diagramService.create(diagram);
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

    @GetMapping("/nodes/{id}")
    public ArrayList<Node> getNodes(@PathVariable long id)
    {
        return diagramService.getNodes(id);
    }

    @GetMapping("/links/{id}")
    public ArrayList<Link> getLinks(@PathVariable long id)
    {
        return diagramService.getLinks(id);
    }
    @RequestMapping(value = "/name/{id}", method = RequestMethod.GET,
            name = MediaType.APPLICATION_JSON_VALUE)
    public StringResponse getName(@PathVariable long id)
    {
        return diagramService.getDiagramName(id);
    }

    @RequestMapping(value = "/update/{id}", method = RequestMethod.PUT,
            name = MediaType.APPLICATION_JSON_VALUE)
    public StringResponse updateDiagram(@PathVariable long id, @RequestBody Diagram diagram)
    {
        return diagramService.updateDiagram(id,diagram);
    }
    @GetMapping("/nodesAndlinks/{id}")
    public Object getNodesAndLinks(@PathVariable long id)
    {
        return diagramService.getDiagramNodesAndLinks(id);
    }

    @GetMapping("/details/{id}")
    public Object getDiagramDetails(@PathVariable long id)
    {
        return diagramService.getDiagrambyDiagramID(id);
    }

}
