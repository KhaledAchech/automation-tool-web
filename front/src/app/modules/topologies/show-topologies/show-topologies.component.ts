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
      { id: 1, name: 'Hydrogen', type: 'WAN', tenant:'Hewlett Packard Enterprise' },
      { id: 2, name: 'Helium',  type: 'LAN', tenant:'Cisco Systems' },
      { id: 3, name: 'Lithium',  type: 'WAN', tenant:'Cumulus Networks' },
      { id: 4, name: 'Beryllium', type: 'WAN', tenant:'Dell EMC' },
      { id: 5, name: 'Boron',  type: 'LAN', tenant:'Extreme Networks' },
      { id: 6, name: 'Carbon',  type: 'WAN', tenant:'Juniper Networks' },
      { id: 7, name: 'Nitrogen',  type: 'WAN', tenant:'Netscout' },
      { id: 8, name: 'Oxygen',  type: 'LAN', tenant:'Hewlett Packard Enterprise' },
      { id: 9, name: 'Fluorine',  type: 'LAN', tenant:'Hewlett Packard Enterprise' },
      { id: 10, name: 'Neon',  type: 'WAN', tenant:'Hewlett Packard Enterprise' },
      { id: 11, name: 'Sodium',  type: 'WAN', tenant:'Hewlett Packard Enterprise' },
      { id: 12, name: 'Magnesium',  type: 'WAN', tenant:'Hewlett Packard Enterprise' },
      { id: 13, name: 'Aluminum',  type: 'LAN', tenant:'Hewlett Packard Enterprise' },
      { id: 14, name: 'Silicon',  type: 'LAN', tenant:'Hewlett Packard Enterprise' },
      { id: 15, name: 'Phosphorus',  type: 'LAN', tenant:'Hewlett Packard Enterprise' },
      { id: 16, name: 'Sulfur',  type: 'LAN', tenant:'Hewlett Packard Enterprise' },
      { id: 17, name: 'Chlorine',  type: 'LAN', tenant:'Hewlett Packard Enterprise' },
      { id: 18, name: 'Argon',  type: 'LAN', tenant:'Hewlett Packard Enterprise' },
      { id: 19, name: 'Potassium',  type: 'LAN', tenant:'Hewlett Packard Enterprise' },
      { id: 20, name: 'Calcium',  type: 'WAN', tenant:'Hewlett Packard Enterprise' },
  ];
  }

}
