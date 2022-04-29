import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import * as go from 'gojs';
import { DiagramComponent } from 'gojs-angular';
import * as $ from "jquery";
import * as bootstrap from "bootstrap";
import {ActivatedRoute, Router} from '@angular/router';
import { Node } from 'src/app/common/interfaces/node';
import { Palette } from 'src/app/common/interfaces/palette';
import { Link } from 'src/app/common/interfaces/link';
import { DiagramService } from 'src/app/services/editor/diagram.service';
import { DeviceService } from 'src/app/services/network/device.service';
import { Diagram } from 'src/app/common/interfaces/diagram';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditorComponent implements OnInit{

  diagramName!:any;

  diagramID!:string;

  modalTitle:string = '';
  activateShowDeviceDetailsComponent:boolean = false;
  device:any;

  saveModelJson:any = null;

  keys:string[] = [];
  hostnames:string[] = [];

  dataArray: Node[] = [];
  paletteArray: Palette[] = [];
  linkArray: Link[] = [];

  diagramNodes: any[] = [];
  diagramLinks: any[] = [];

  data: Diagram = {
    nodes: [],
    links: []
  };
  nodes!: any[];
  links!: any[];

  isChanged = false;
  id:any = null;

  addFlag:boolean = true;

  loading:boolean = false;

  constructor(private route:ActivatedRoute,private router:Router,
               private service: DiagramService,
               private deviceService: DeviceService) { }

  ngOnInit(): void {

      //setup the diagram values 
      this.nodes = this.state.diagramNodeData;
      this.links = this.state.diagramLinkData;
      this.id = this.route.snapshot.params['id'];
      //loading backend data
      this.load();
  }

public state = {
  // Diagram state props
  diagramNodeData: this.dataArray,
  diagramLinkData:  this.linkArray,
  diagramModelData: { prop: 'value' },
  skipsDiagramUpdate: false,

  paletteNodeData: this.paletteArray

}; // end state object

public diagramDivClassName: string = 'myDiagramDiv';
public paletteDivClassName = 'myPaletteDiv';


// initialize diagram / templates
public initDiagram(): go.Diagram {
  const editor:EditorComponent=this;
  const $ = go.GraphObject.make;
  const dia = $(go.Diagram, 
    {
      'undoManager.isEnabled': true,
      model: $(go.GraphLinksModel, {
        linkKeyProperty: 'key'  // this should always be set when using a GraphLinksModel
      })
    });
      function nodeTypeImage(type:any) {
        switch (type) {                                         // Image sizes
          case "SWITCH": return "assets/images/voice atm switch.jpg";      // 55x55
          case "ROUTER": return "assets/images/server switch.jpg";         // 55x55
          case "PROCESSOR": return "assets/images/general processor.jpg";     // 60x85
          case "SERVER": return "assets/images/storage array.jpg";         // 55x80
          case "HUB": return "assets/images/iptv broadcast server.jpg"; // 80x50
          case "GATEWAY": return "assets/images/content engine.jpg";        // 90x65
          case "PC": return "assets/images/pc.jpg";                    // 80x70
          default: return "assets/images/pc.jpg";                      // 80x70
        }
      }

      function nodeTypeSize(type:any) {
        switch (type) {
          case "SWITCH": return new go.Size(55, 55);
          case "ROUTER": return new go.Size(55, 55);
          case "PROCESSOR": return new go.Size(60, 85);
          case "SERVER": return new go.Size(55, 80);
          case "HUB": return new go.Size(80, 50);
          case "GATEWAY": return new go.Size(90, 65);
          case "PC": return new go.Size(80, 70);
          default: return new go.Size(80, 70);
        }
      }

      function nodeProblemConverter(msg:any) {
        if (msg) return "red";
        return null;
      }

      function nodeOperationConverter(s:any) {
        if (s >= 2) return "TriangleDown";
        if (s >= 1) return "Rectangle";
        return "Circle";
      }

      function nodeStatusConverter(s:any) {
        if (s >= 2) return "red";
        if (s >= 1) return "yellow";
        return "green";
      }

  // define the Node template
  dia.nodeTemplate =
 $(go.Node, "Vertical",
          { 
             locationObjectName: "ICON" },
          new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
          $(go.Panel, "Spot",
            $(go.Panel, "Auto",
              { name: "ICON" },
              $(go.Shape,
                { fill: null, stroke: null },
                 { fill:"blue" , portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer", strokeWidth:2 },
                new go.Binding("background", "problem", nodeProblemConverter),
                new go.AnimationTrigger('background')),
              $(go.Picture,
                { margin: 5 },
                new go.Binding("source", "type", nodeTypeImage),
                new go.Binding("desiredSize", "type", nodeTypeSize))
            ),  // end Auto Panel
            $(go.Shape, "Circle",
              {
                alignment: go.Spot.TopLeft, alignmentFocus: go.Spot.TopLeft,
                width: 12, height: 12, fill: "orange"
              },
              new go.Binding("figure", "operation", nodeOperationConverter)),
            $(go.Shape, "Triangle",
              {
                alignment: go.Spot.TopRight, alignmentFocus: go.Spot.TopRight,
                width: 12, height: 12, fill: "blue"
              },
              new go.Binding("fill", "status", nodeStatusConverter),
              new go.AnimationTrigger('fill'))
          ),  // end Spot Panel
          $(go.TextBlock,
            new go.Binding("text")));  // end Node
        
        //Handling the link
      function linkProblemConverter(msg: any) {
        if (msg) return "red";
        return "gray";
      }

      dia.linkTemplate =
        $(go.Link, 
          { relinkableFrom: true, relinkableTo:true},
          { reshapable: true, routing: go.Link.Orthogonal},
          go.Link.AvoidsNodes,
          { corner: 3 },
          $(go.Shape,
            { strokeWidth: 2, stroke: "gray" },
            new go.Binding("stroke", "problem", linkProblemConverter),
            new go.AnimationTrigger('stroke'))
        );

        dia.toolManager.relinkingTool.fromHandleArchetype = 
            $(go.Shape, "Diamond", { desiredSize: new go.Size(9,9), stroke: "green", fill:"lime", segmentIndex:0});

        dia.toolManager.relinkingTool.fromHandleArchetype = 
            $(go.Shape, "Diamond", { desiredSize: new go.Size(9,9), stroke: "red", fill:"pink", segmentIndex:0});
        
        dia.toolManager.dragSelectingTool.box = 
            $(go.Part, { layerName: "Tool"},
                $(go.Shape, "Rectangle", { fill: null, strokeWidth:2, stroke:"blue"}));
            
        dia.toolManager.linkingTool.temporaryLink = 
            $(go.Link, { layerName: "Tool"},
              $(go.Shape, { stroke : "blue", strokeWidth:2})
            );

        

      //Handle double click update or add or simply display details:
      dia.addDiagramListener("ObjectSingleClicked",
        function(e) {
          var part = e.subject.part;
          if (!(part instanceof go.Link)) console.log("Clicked on " + part.data.key);
        });
        
  return dia;
}

public initPalette(): go.Palette {
  const $ = go.GraphObject.make;
  const palette = $(go.Palette);

   function nodeTypeImage(type:any) {
        switch (type) {                                         // Image sizes
          case "SWITCH": return "assets/images/voice atm switch.jpg";      // 55x55
          case "ROUTER": return "assets/images/server switch.jpg";         // 55x55
          case "PROCESSOR": return "assets/images/general processor.jpg";     // 60x85
          case "SERVER": return "assets/images/storage array.jpg";         // 55x80
          case "HUB": return "assets/images/iptv broadcast server.jpg"; // 80x50
          case "GATEWAY": return "assets/images/content engine.jpg";        // 90x65
          case "PC": return "assets/images/pc.jpg";                    // 80x70
          default: return "assets/images/pc.jpg";                      // 80x70
        }
      }

      function nodeTypeSize(type:any) {
        switch (type) {
          case "SWITCH": return new go.Size(55, 55);
          case "ROUTER": return new go.Size(55, 55);
          case "PROCESSOR": return new go.Size(60, 85);
          case "SERVER": return new go.Size(55, 80);
          case "HUB": return new go.Size(80, 50);
          case "GATEWAY": return new go.Size(90, 65);
          case "PC": return new go.Size(80, 70);
          default: return new go.Size(80, 70);
        }
      }

      function nodeProblemConverter(msg:any) {
        if (msg) return "red";
        return null;
      }

      function nodeOperationConverter(s:any) {
        if (s >= 2) return "TriangleDown";
        if (s >= 1) return "Rectangle";
        return "Circle";
      }

      function nodeStatusConverter(s:any) {
        if (s >= 2) return "red";
        if (s >= 1) return "yellow";
        return "green";
      }

  // define the Node template
  palette.nodeTemplate =
    $(go.Node, "Vertical",
          { 
             locationObjectName: "ICON" },
          new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
          $(go.Panel, "Spot",
            $(go.Panel, "Auto",
              { name: "ICON" },
              $(go.Shape,
                { fill: null, stroke: null },
                 { fill:"blue" , portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer", strokeWidth:2 },
                new go.Binding("background", "problem", nodeProblemConverter),
                new go.AnimationTrigger('background')),
              $(go.Picture,
                { margin: 5 },
                new go.Binding("source", "type", nodeTypeImage),
                new go.Binding("desiredSize", "type", nodeTypeSize))
            ),  // end Auto Panel
            $(go.Shape, "Circle",
              {
                alignment: go.Spot.TopLeft, alignmentFocus: go.Spot.TopLeft,
                width: 12, height: 12, fill: "orange"
              },
              new go.Binding("figure", "operation", nodeOperationConverter)),
            $(go.Shape, "Triangle",
              {
                alignment: go.Spot.TopRight, alignmentFocus: go.Spot.TopRight,
                width: 12, height: 12, fill: "blue"
              },
              new go.Binding("fill", "status", nodeStatusConverter),
              new go.AnimationTrigger('fill'))
          ),  // end Spot Panel
          $(go.TextBlock,
            new go.Binding("text"))); 

  palette.model = new go.GraphLinksModel(
    {
      linkKeyProperty: 'key'  // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
    });

  return palette;
}

@ViewChild('myDiag', {static: false}) myDiag!: DiagramComponent;

ngAfterViewInit() {
  
  const $ = go.GraphObject.make;
  const editor: EditorComponent = this;

    //set up our node diagram data
    // this.state.diagramNodeData.map((node)=> {
    // this.keys.push(node.key);
    // this.hostnames.push(node.text);});
    // console.log(this.hostnames);

  this.service.getDiagramNameById(this.id).subscribe(data => {
    editor.diagramName = data;
  })
  //Context menu for details
  this.myDiag.diagram.nodeTemplate.contextMenu = 
    $('ContextMenu',  "Spot",
    $(go.Placeholder, { padding: 5 }),
         $('ContextMenuButton',
          {
            "ButtonBorder.fill": "yellow",
            "_buttonFillOver": "cyan",
            "_buttonFillPressed": "lime"
          },
            $(go.TextBlock, 'View Details'),
            {   alignment: go.Spot.Right, alignmentFocus: go.Spot.Left,
              click: (e, obj) => {
                editor.showDetails(e,obj)
              }
            })
    );

    //handle double click => show details 
    this.myDiag.diagram.nodeTemplate.doubleClick=(e:go.InputEvent, obj:go.GraphObject) => {
              editor.showDetails(e,obj)
            };
    
    //handle unsaved state 
    this.myDiag.diagram.addDiagramListener("Modified", e => {
        var button = document.getElementById("saveModel");
        if (button) this.isChanged = !this.myDiag.diagram.isModified;
        var idx = document.title.indexOf("*");
        if (this.myDiag.diagram.isModified) {
          if (idx < 0) document.title += "*";
        } else {
          if (idx >= 0) document.title = document.title.substr(0, idx);
        }
      });

    //hundle duplicates from palette 
    this.myDiag.diagram.addDiagramListener("ExternalObjectsDropped", e =>{
      var newnode = this.myDiag.diagram.selection.first();
      var hostname = newnode?.data.text;
      var deviceExists = editor.exist(hostname);
      // device exists in the diagram, remove the duplicate node
      if (deviceExists)
      {
        this.addFlag = false;
        alert("Device already exists, removing the device from the main diagram ...");
        this.myDiag.diagram.commandHandler.deleteSelection();
      }
      else
      {
        this.addFlag = true;
      }
    })

    this.myDiag.diagram.addModelChangedListener((e) => {
        if (!e.isTransactionFinished) return;

        var data = e.model?.toIncrementalData(e);

        editor.manageData(data)
      });

    
  }

manageData(data:any)
{
  
  //add new device from the palette
  if (data?.insertedNodeKeys)
    {
      if (data?.modifiedNodeData) // ==> check nodes changes
        if(this.addFlag)
        {
          this.addNode(data?.modifiedNodeData[0]);  // addNode(node)
        }
    }

  //draw new link
  if (data?.insertedLinkKeys)
    {
      if (data?.modifiedLinkData) // ==> check links changes
        this.addLink(data?.modifiedLinkData[0]);// addLink(link)
    }

  //update links
  if (data?.modifiedLinkData && !data?.insertedLinkKeys) // ==> check links changes
    {
      this.updateLink(data?.modifiedLinkData[0]); // updateLink(link)
    }
  
  //update nodes
  if (data?.modifiedNodeData && !data?.insertedNodeKeys) // ==> check nodes changes
    {
      this.updateNode(data?.modifiedNodeData[0]); // updateNode(node)
    }


  //delete nodes
  if (data?.removedNodeKeys)
    this.deleteNode(data?.removedNodeKeys[0]); // deleteNode(node)

  //delete links
  if (data?.removedLinkKeys)
    this.deleteLink(data?.removedLinkKeys[0]) // deletelink(node)
}

addNode(node: any)
{
  this.diagramNodes?.push(node);
}

addLink(Link: any)
{
  this.diagramLinks.push(Link);
}

updateLink(link:any)
{
  this.diagramLinks.forEach((dialink,index)=>{
    if (dialink.key === link.key)
    {
      this.diagramLinks.splice(index,1);
      this.diagramLinks.push(link);
    }

  })
}

updateNode(node:any)
{
  this.diagramNodes.forEach((dianode,index)=>{
    if (dianode.key === node.key)
    {
      this.diagramNodes.splice(index,1);
      this.diagramNodes.push(node);
    }
  })
}

deleteNode(node:any)
{
  this.diagramNodes.forEach((dianode,index)=>{
    if (dianode.key === node)
    {
      this.hostnames.forEach((name,index) => {
        if (name === dianode.text)
          this.hostnames.splice(index,1)
      })
      this.diagramNodes.splice(index,1);
    }
  })
}

deleteLink(link:any)
{
  this.diagramLinks.forEach((dialink,index)=>{
    if (dialink.key === link)
    {
      this.diagramLinks.splice(index,1);
    }

  })
}

showDetails(e:any, obj:any) {

  this.deviceService.getDeviceById(Number(obj.part.data.key)).subscribe(res => {
      this.device = res;
    });
  
  this.modalTitle = "Device Details";
  this.activateShowDeviceDetailsComponent = true;
        
  this.openModal();   
}

exist(hostname:string)
{
  if (this.hostnames?.includes(hostname))
  {
    return true;
  }
  else
  {
    this.hostnames.push(hostname);
    return false;
  }
}

clickSave() {

  this.loading = true;
  this.paletteArray.forEach(node => {
    if(!this.nodes.includes(node))
      this.nodes.push(node);
  })
  this.diagramNodes.forEach(node =>{
    if(!this.nodes.includes(node))
      this.nodes.push(node);
  })
  this.diagramLinks.forEach(link =>{
    if(!this.links.includes(link))
      this.links.push(link);
  })
  this.data.nodes = this.nodes;
  this.data.links = this.links;

  this.nodes = [];
  this.links = [];

  this.service.updateDiagramById(this.id, this.data).subscribe(res => {
    if (res)
    {
      this.loading = false;
    }
    this.saveModelJson = this.myDiag.diagram.model.toJson();
    this.myDiag.diagram.isModified = false;
  });
 
}

// testing custom fields
clickLoad()
{
    if (this.myDiag.diagram.isModified)
      {
        if(confirm("You have unsaved changes, are you sure you want to reload ?"))
        {
          if (this.saveModelJson)
          {
            this.myDiag.diagram.model = go.Model.fromJson(this.saveModelJson);
          }
          else
          {
             window.location.reload();
          }
        }
      }
}

modalClose() {
    this.activateShowDeviceDetailsComponent = false;
}

checkChanges()
{
  if (this.myDiag.diagram.isModified)
  {
    if(confirm("You have unsaved changes, are you sure you want to go back ?"))
    {
      this.router.navigate(['topologies']);
    }
  }
  else
  {
    this.router.navigate(['topologies']);
  }
}

openModal() {
    jQuery('#staticBackdrop').modal('toggle');
}

load()
{
  this.service.getDiagramByDiagramID(this.id).subscribe(data => {
    
    //fetching nodes
    data.nodes.forEach((node:any) => {
          if (node.loc)
          {   this.keys.push(node.key);
              this.hostnames.push(node.text);
            this.dataArray.push(
            {
              "key": node.key,
              "text": node.text,
              "type": node.type,
              "loc":node.loc,
              "hostname": node.text
            }
            );
          }
          else
          {
            this.paletteArray.push(
            {
              "key": node.key,
              "text":node.text,
              "type":node.type
            })
          }
  })
  this.diagramID = data.id;
  // fetching links
  data.links.forEach((link:any) => {
          this.linkArray.push(
            {
              "key": link.key,
              "from": link.from,
              "to": link.to
            }
          )
  });
});
}
public diagramModelChange = function(changes: go.IncrementalData) {

  // console.info(changes.modifiedNodeData?.forEach( e => {
  //  console.log(e['text'])
  // }));
  // return "test true" }));
};

}
