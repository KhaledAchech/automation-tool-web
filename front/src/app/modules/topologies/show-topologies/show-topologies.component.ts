import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-show-topologies',
  templateUrl: './show-topologies.component.html',
  styleUrls: ['./show-topologies.component.scss']
})
export class ShowTopologiesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'type'];
  
  dataSource!:  any[]; 

  constructor() { }

  ngOnInit(): void {
    this.dataSource = [
      { id: 1, name: 'Hydrogen', type: 'Mesh Topology' },
      { id: 2, name: 'Helium',  type: 'Star Topology' },
      { id: 3, name: 'Lithium',  type: 'Bus Topology' },
      { id: 4, name: 'Beryllium', type: 'Bus Topology' },
      { id: 5, name: 'Boron',  type: 'Bus Topology' },
      { id: 6, name: 'Carbon',  type: 'Mesh Topology' },
      { id: 7, name: 'Nitrogen',  type: 'Ring Topology' },
      { id: 8, name: 'Oxygen',  type: 'Star Topology' },
      { id: 9, name: 'Fluorine',  type: 'Mesh Topology' },
      { id: 10, name: 'Neon',  type: 'Mesh Topology' },
      { id: 11, name: 'Sodium',  type: 'Star Topology' },
      { id: 12, name: 'Magnesium',  type: 'Bus Topology' },
      { id: 13, name: 'Aluminum',  type: 'Bus Topology' },
      { id: 14, name: 'Silicon',  type: 'Hybrid Topology' },
      { id: 15, name: 'Phosphorus',  type: 'Hybrid Topology' },
      { id: 16, name: 'Sulfur',  type: 'Ring Topology' },
      { id: 17, name: 'Chlorine',  type: 'Ring Topology' },
      { id: 18, name: 'Argon',  type: 'Bus Topology' },
      { id: 19, name: 'Potassium',  type: 'Hybrid Topology' },
      { id: 20, name: 'Calcium',  type: 'Mesh Topology' },
  ];
  }

}
