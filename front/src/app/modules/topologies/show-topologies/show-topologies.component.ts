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
      { id: 1, name: 'Hydrogen', type: 'WAN' },
      { id: 2, name: 'Helium',  type: 'LAN' },
      { id: 3, name: 'Lithium',  type: 'WAN' },
      { id: 4, name: 'Beryllium', type: 'WAN' },
      { id: 5, name: 'Boron',  type: 'LAN' },
      { id: 6, name: 'Carbon',  type: 'WAN' },
      { id: 7, name: 'Nitrogen',  type: 'WAN' },
      { id: 8, name: 'Oxygen',  type: 'LAN' },
      { id: 9, name: 'Fluorine',  type: 'LAN' },
      { id: 10, name: 'Neon',  type: 'WAN' },
      { id: 11, name: 'Sodium',  type: 'WAN' },
      { id: 12, name: 'Magnesium',  type: 'WAN' },
      { id: 13, name: 'Aluminum',  type: 'LAN' },
      { id: 14, name: 'Silicon',  type: 'LAN' },
      { id: 15, name: 'Phosphorus',  type: 'LAN' },
      { id: 16, name: 'Sulfur',  type: 'LAN' },
      { id: 17, name: 'Chlorine',  type: 'LAN' },
      { id: 18, name: 'Argon',  type: 'LAN' },
      { id: 19, name: 'Potassium',  type: 'LAN' },
      { id: 20, name: 'Calcium',  type: 'WAN' },
  ];
  }

}
