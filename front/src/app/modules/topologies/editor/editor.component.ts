import { Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import * as go from 'gojs';
import { DiagramComponent } from 'gojs-angular';
import * as $ from "jquery";
import * as bootstrap from "bootstrap";
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditorComponent {

  modalTitle:string = '';
  activateAddEditDeviceComponent:boolean = false;
  device:any;

  saveModelJson:any = null;

  keys:string[] = [];

  constructor(private route:ActivatedRoute,private router:Router) { }

isChanged = false;
dataArray = [
  {"key":"1", "text":"Switch 23", "type":"S2", "loc":"195 225", "hostname":"S23"},
  {"key":"2", "text":"Machine 17", "type":"M4", "loc":"183.5 94", "hostname":"S23"},
  {"key":"3", "text":"Panel 7", "type":"P2", "loc":"75 211.5", "hostname":"S23"},
  {"key":"4", "text":"Switch 24", "type":"S3", "loc":"306 225", "hostname":"S23"},
  {"key":"5", "text":"Machine 18", "type":"M5", "loc":"288.5 95", "hostname":"S23"},
  {"key":"6", "text":"Panel 9", "type":"P1", "loc":"426 211", "hostname":"S23"},
  {"key":"7", "text":"Instr 3", "type":"I1", "loc":"-50 218", "hostname":"S23"} ];

linkArray = [
  {key: -1, from:'1',  to: '2'},
  {key: -2, from:"1",  to:"3"},
  {key: -3, from:"1",  to:"4"},
  {key: -4, from:"4",  to:"5"},
  {key: -5, from:"4",  to:"6"},
  {key: -6, from:"7",  to:"2"},
  {key: -7, from:"7",  to:"3"}
 ];

public state = {
  // Diagram state props
  diagramNodeData: this.dataArray,
  diagramLinkData:  this.linkArray,
  diagramModelData: { prop: 'value' },
  skipsDiagramUpdate: false,

  // Palette state props
  paletteNodeData: [
    { key: 'PaletteNode1', color: 'firebrick' },
    { key: 'PaletteNode2', color: 'blueviolet' }
  ]
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
          case "S2": return "assets/images/voice atm switch.jpg";      // 55x55
          case "S3": return "assets/images/server switch.jpg";         // 55x55
          case "P1": return "assets/images/general processor.jpg";     // 60x85
          case "P2": return "assets/images/storage array.jpg";         // 55x80
          case "M4": return "assets/images/iptv broadcast server.jpg"; // 80x50
          case "M5": return "assets/images/content engine.jpg";        // 90x65
          case "I1": return "assets/images/pc.jpg";                    // 80x70
          default: return "assets/images/pc.jpg";                      // 80x70
        }
      }

      function nodeTypeSize(type:any) {
        switch (type) {
          case "S2": return new go.Size(55, 55);
          case "S3": return new go.Size(55, 55);
          case "P1": return new go.Size(60, 85);
          case "P2": return new go.Size(55, 80);
          case "M4": return new go.Size(80, 50);
          case "M5": return new go.Size(90, 65);
          case "I1": return new go.Size(80, 70);
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

    //   function nodeClicked(e : any, obj1: any) {  // executed by click and doubleclick handlers
    //   var evt = e.copy();
    //   var node1 = obj1.part;
    //   var type = evt.clickCount === 2 ? "Double-Clicked: " : "Clicked: ";
    //   var msg = type + node1.data.key + ". ";
    //   console.log(msg);
    // }

    
    // function deviceClicked(e : any, obj1: any) {  // executed by click and doubleclick handlers
    //   var evt = e.copy();
    //   var node1 = obj1.part;
    //   var type = evt.clickCount === 2 ? "Double-Clicked: " : "Clicked: ";
    //   var msg = type + node1.data.key + ". ";
    //   console.log(msg);
    // }

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
            new go.Binding("text")),
          {
            toolTip:                       // define a tooltip for each node
                  $(go.Adornment, "Spot",      // that has several labels around it
                    { background: "transparent" },  // avoid hiding tooltip when mouse moves
                    $(go.Placeholder, { padding: 5 }),
                    $(go.TextBlock,
                      { alignment: go.Spot.Top, alignmentFocus: go.Spot.Bottom, stroke: "blue" },
                      new go.Binding("text", "key", function(s) { return "key: " + s; })),
                    $(go.TextBlock, "Bottom",
                      { alignment: go.Spot.Bottom, alignmentFocus: go.Spot.Top, stroke: "blue" },
                      new go.Binding("text", "text", function(s) { return "text: " + s; })),
                    $(go.TextBlock, "Bottom",
                      { alignment: go.Spot.Right, alignmentFocus: go.Spot.Left, stroke: "blue" },
                      new go.Binding("text", "type", function(s) { return "type: " + s; }))
                  )  // end Adornment
          }
        );  // end Node
        
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

        
        //handle unsaved state 
      //   dia.addDiagramListener("Modified", e => {
      //   var button = document.getElementById("saveModel");
      //   if (button) this.isChanged = !dia.isModified;
      //   var idx = document.title.indexOf("*");
      //   if (dia.isModified) {
      //     if (idx < 0) document.title += "*";
      //   } else {
      //     if (idx >= 0) document.title = document.title.substr(0, idx);
      //   }
      // });

      //Handle double click update or add or simply display details:
      dia.addDiagramListener("ObjectSingleClicked",
        function(e) {
          var part = e.subject.part;
          if (!(part instanceof go.Link)) console.log("Clicked on " + part.data.key);
        });

      // dia.addDiagramListener("ObjectDoubleClicked",
      //     function(e){
      //             var part = e.subject.part;
      //               if (!(part instanceof go.Link)) 
      //               {
      //                   return part;
      //               }
      //     });
      
      
      // dia.addDiagramListener("ObjectDoubleClicked",
      //       (e:any)=>{
      //           var part = e.subject.part;
      //               if (!(part instanceof go.Link)) 
      //                 {
      //                   console.log("am here");
      //                   //this.addDevice();
      //                 }
      //           });
        
      // dia.addModelChangedListener((evt) => {
      //   if (evt) this.isChanged = true;
      //   console.log(this.isChanged);
      // });

      //side nav / palette thing 
      var myPalette =
                $(go.Palette, "myPaletteDiv",
                        {
                            nodeTemplateMap: dia.nodeTemplateMap,
                            layout:
                                $(go.GridLayout,
                                    {
                                        cellSize: new go.Size(2, 2),
                                        isViewportSized: true
                                    })
                        }
                    );
                
                myPalette.model.nodeDataArray = [
                  {"key":"1", "text":"<double click to define this new device>","type":"S2"},
                  {"key":"2", "text":"<double click to define this new device>","type":"M4"},
                  {"key":"3", "text":"<double click to define this new device>","type":"P2"},
                  {"key":"4", "text":"<double click to define this new device>","type":"S3"},
                  {"key":"5", "text":"<double click to define this new device>","type":"M5"},
                  {"key":"6", "text":"<double click to define this new device>","type":"P1"},
                  {"key":"7", "text":"<double click to define this new device>","type":"I1"} ]
                

                // remove cursors on all ports in the Palette
                // make TextBlocks invisible, to reduce size of Nodes
                myPalette.nodes.each(node => {
                    node.ports.each(port => port.cursor = "");
                    node.elements.each(tb => {
                        if (tb instanceof go.TextBlock) tb.visible = false;
                    });
                });

                
                
  return dia;
}

@ViewChild('myDiag', {static: false}) myDiag!: DiagramComponent;

ngAfterViewInit() {
  const $ = go.GraphObject.make;
  const editor: EditorComponent = this;

  //Context menu and update
  this.myDiag.diagram.nodeTemplate.contextMenu = 
    $('ContextMenu',  "Spot",
    $(go.Placeholder, { padding: 5 }),
      $('ContextMenuButton',
      {
        "ButtonBorder.fill": "yellow",
        "_buttonFillOver": "cyan",
        "_buttonFillPressed": "lime"
      },
        $(go.TextBlock, 'Update'),
        {  alignment: go.Spot.Top, alignmentFocus: go.Spot.Bottom,
          click: (e, obj) => {
            editor.updateDevice(e, obj);
          }
        }),
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
              console.log(this.myDiag.diagram.model)
              editor.addDevice(e,obj);
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
        // ignore unimportant Transaction events
        if (!e.isTransactionFinished) return;
        //var json = e.model?.toIncrementalJson(e);
        var data = e.model?.toIncrementalData(e);
        //console.log(editor.saveModelJson);
        //console.log(json);

        console.log(data?.modifiedNodeData);
        //console.log(editor.dataArray);
      });
  }

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
        //this.device = obj.part.data; ==> when we update the model in the back end
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
  //  Ref :
  //   this.dataArray.push({"key":"8", "text":"Instr 8", "type":"I1", "loc":"-50 218", "hostname":"S288"});
  //   this.state.diagramNodeData = this.dataArray;
}

clickSave() {
  this.saveModelJson = this.myDiag.diagram.model.toJson();
  this.myDiag.diagram.isModified = false;
}

// testing custom fields
clickLoad()
{
//   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
//     this.router.navigate(['/editor']);
// }); 
//  window.location.reload();
    this.myDiag.diagram.model = go.Model.fromJson(this.saveModelJson);
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

public diagramModelChange = function(changes: go.IncrementalData) {

  // console.info(changes.modifiedNodeData?.forEach( e => {
  // //   console.log(e)
  // }));
  // return "test true" }));
};

}
