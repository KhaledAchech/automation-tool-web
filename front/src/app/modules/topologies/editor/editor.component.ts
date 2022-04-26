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

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditorComponent implements OnInit{

  modalTitle:string = '';
  activateAddEditDeviceComponent:boolean = false;
  device:any;

  saveModelJson:any = null;

  keys:string[] = [];

  dataArray: Node[] = [];
  paletteArray: Palette[] = [];

  linkArray: Link[] = [];

  
isChanged = false;


  constructor(private route:ActivatedRoute,private router:Router, private service: DiagramService) { }

  ngOnInit(): void {

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
          case "switch": return "assets/images/voice atm switch.jpg";      // 55x55
          case "router": return "assets/images/server switch.jpg";         // 55x55
          case "processor": return "assets/images/general processor.jpg";     // 60x85
          case "server": return "assets/images/storage array.jpg";         // 55x80
          case "hub": return "assets/images/iptv broadcast server.jpg"; // 80x50
          case "gateway": return "assets/images/content engine.jpg";        // 90x65
          case "pc": return "assets/images/pc.jpg";                    // 80x70
          default: return "assets/images/pc.jpg";                      // 80x70
        }
      }

      function nodeTypeSize(type:any) {
        switch (type) {
          case "switch": return new go.Size(55, 55);
          case "router": return new go.Size(55, 55);
          case "processor": return new go.Size(60, 85);
          case "server": return new go.Size(55, 80);
          case "hub": return new go.Size(80, 50);
          case "gateway": return new go.Size(90, 65);
          case "pc": return new go.Size(80, 70);
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
          case "switch": return "assets/images/voice atm switch.jpg";      // 55x55
          case "router": return "assets/images/server switch.jpg";         // 55x55
          case "processor": return "assets/images/general processor.jpg";     // 60x85
          case "server": return "assets/images/storage array.jpg";         // 55x80
          case "hub": return "assets/images/iptv broadcast server.jpg"; // 80x50
          case "gateway": return "assets/images/content engine.jpg";        // 90x65
          case "pc": return "assets/images/pc.jpg";                    // 80x70
          default: return "assets/images/pc.jpg";                      // 80x70
        }
      }

      function nodeTypeSize(type:any) {
        switch (type) {
          case "switch": return new go.Size(55, 55);
          case "router": return new go.Size(55, 55);
          case "processor": return new go.Size(60, 85);
          case "server": return new go.Size(55, 80);
          case "hub": return new go.Size(80, 50);
          case "gateway": return new go.Size(90, 65);
          case "pc": return new go.Size(80, 70);
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
                console.log("to be added spooonnn ")
              }
            })
    );
    
    //set up keys array
    this.state.diagramNodeData.map((node)=> {
      this.keys.push(node.key);});

    //handle add
    this.myDiag.diagram.nodeTemplate.doubleClick=(e:go.InputEvent, obj:go.GraphObject) => {
              console.log( this.linkArray);
              //editor.addDevice(e,obj);
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

      this.myDiag.diagram.addModelChangedListener((e) => {
        if (!e.isTransactionFinished) return;

        var data = e.model?.toIncrementalData(e);

        //detect new links
        console.log(data?.modifiedLinkData);

        //detect new nodes from palette
        console.log(data?.modifiedNodeData);
      });
  }

// We don't need the add and update am just going to keep them for references 
/**************************************************************************
addDevice(e:any, obj:any)
{
  if (obj) {
      if (this.keys.includes(obj.part.data.key))
      {
       return;
      }
      else{
        this.device = {
                    id:0,
                    name:null,
                    os:null,
                    status:'Down'
                  }
        this.modalTitle = "Add Device";
        this.activateAddEditDeviceComponent = true;
        obj.part.data.text = "banana";
        this.openModal();
      }
  }
}  

updateDevice(e:any, obj:any) {

  console.log('e2: ', obj.part.data.key);
  if (obj)
  {
    if (!this.keys.includes(obj.part.data.key))
      {
       console.error("this device is not found in the db to be updated");
      }
    else
      {
        this.device = {
                    id:1,
                    name:'test',
                    os:'test update',
                    status:'Down'
                  }
        this.modalTitle = "Edit Device";
        this.activateAddEditDeviceComponent = true;
        
        this.openModal();
      }
  }
}
**************************************************************************/
clickSave() {
  this.saveModelJson = this.myDiag.diagram.model.toJson();
  this.myDiag.diagram.isModified = false;
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
    this.activateAddEditDeviceComponent = false;
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
    this.service.getDiagramNodesById('c65fc577-cdb5-4469-8d9f-ca975184b44b').subscribe(
      data => {
        data.forEach(node => {
          this.dataArray.push(
            {
              "key": node.key,
              "text": node.text,
              "type": node.type,
              "loc":node.loc,
              "hostname": node.text
            }
          );
          this.paletteArray.push(
            {
              "key": node.key,
              "text":node.text,
              "type":node.type
            }
          )
        });;
      }
    )
    this.service.getDiagramLinksById('41debeab-7b14-459c-ab82-c5df42536fbc').subscribe(
        data => {
        data.forEach(link => {
          this.linkArray.push(
            {
              "key": link.key,
              "from": link.from,
              "to": link.to
            }
          )})});

          console.log(this.linkArray)
}

public diagramModelChange = function(changes: go.IncrementalData) {

  // console.info(changes.modifiedNodeData?.forEach( e => {
  // //   console.log(e)
  // }));
  // return "test true" }));
};

}
