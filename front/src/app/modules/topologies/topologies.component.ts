import { Component, OnInit, Output, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

export interface topologyElement {
  name: string;
  id: number;
  type: string;
}
const ELEMENT_DATA: topologyElement[] = [
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

@Component({
  selector: 'app-topologies',
  templateUrl: './topologies.component.html',
  styleUrls: ['./topologies.component.scss']
})
export class TopologiesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'type'];
  dataSource = new MatTableDataSource<topologyElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor() { }

  ngOnInit(): void {
     this.dataSource.paginator = this.paginator;
  }
}
