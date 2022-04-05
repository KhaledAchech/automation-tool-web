import { Component, Input, ViewEncapsulation } from '@angular/core';
import * as go from 'gojs';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditorComponent {

isChanged = false;

public state = {
  // Diagram state props
  diagramNodeData: [
  {"key":"1", "text":"Switch 23", "type":"S2", "loc":"195 225", "hostname":"S23"},
  {"key":"2", "text":"Machine 17", "type":"M4", "loc":"183.5 94", "hostname":"S23"},
  {"key":"3", "text":"Panel 7", "type":"P2", "loc":"75 211.5", "hostname":"S23"},
  {"key":"4", "text":"Switch 24", "type":"S3", "loc":"306 225", "hostname":"S23"},
  {"key":"5", "text":"Machine 18", "type":"M5", "loc":"288.5 95", "hostname":"S23"},
  {"key":"6", "text":"Panel 9", "type":"P1", "loc":"426 211", "hostname":"S23"},
  {"key":"7", "text":"Instr 3", "type":"I1", "loc":"-50 218", "hostname":"S23"} ],
  diagramLinkData:  [
  {key: -1, from:'1',  to: '2'},
  {key: -2, from:"1",  to:"3"},
  {key: -3, from:"1",  to:"4"},
  {key: -4, from:"4",  to:"5"},
  {key: -5, from:"4",  to:"6"},
  {key: -6, from:"7",  to:"2"},
  {key: -7, from:"7",  to:"3"}
 ],
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

      function nodeClicked(e : any, obj1: any) {  // executed by click and doubleclick handlers
      var evt = e.copy();
      var node1 = obj1.part;
      var type = evt.clickCount === 2 ? "Double-Clicked: " : "Clicked: ";
      var msg = type + node1.data.key + ". ";
      console.log(msg);
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
            new go.Binding("text"))
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
        dia.addDiagramListener("Modified", e => {
        var button = document.getElementById("saveModel");
        if (button) this.isChanged = !dia.isModified;
        console.log(button);
        var idx = document.title.indexOf("*");
        if (dia.isModified) {
          if (idx < 0) document.title += "*";
        } else {
          if (idx >= 0) document.title = document.title.substr(0, idx);
        }
      });

      // dia.addModelChangedListener((evt) => {
      //   if (evt) this.isChanged = true;
      //   console.log(this.isChanged);
      // });


  return dia;
}

/**
 * Handle GoJS model changes, which output an object of data changes via Mode.toIncrementalData.
 * This method should iterate over thoe changes and update state to keep in sync with the FoJS model.
 * This can be done with any preferred state management method, as long as immutability is preserved.
 */
clickLoad()
{
  console.log(this.state.diagramNodeData[0].hostname);
}

public diagramModelChange = function(changes: go.IncrementalData) {

  // console.info(changes.modifiedNodeData?.forEach( e => {
  // //   console.log(e)
  // }));
  // return "test true" }));
  // see gojs-angular-basic for an example model changed handler that preserves immutability
  // when setting state, be sure to set skipsDiagramUpdate: true since GoJS already has this update

  // if (changes)
  // {
  //   console.log(true);
  // }
  // else
  // {
  //  console.log(false);
  // }
};

// public initPalette(): go.Palette {
//   const $ = go.GraphObject.make;
//   const palette = $(go.Palette);

//   // define the Node template
//   palette.nodeTemplate =
//     $(go.Node, 'Auto',
//       $(go.Shape, 'RoundedRectangle', { stroke: null },
//         new go.Binding('fill', 'color')
//       ),
//       $(go.TextBlock, { margin: 8 },
//         new go.Binding('text', 'key'))
//     );

//   palette.model = new go.GraphLinksModel(
//     {
//       linkKeyProperty: 'key'  // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
//     });

//   return palette;
// }
}
