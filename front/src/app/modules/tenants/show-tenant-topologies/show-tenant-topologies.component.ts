import { Component, OnInit } from '@angular/core';

export interface DeviceInterfaces {
  name: string;
  id: number;
  type: string;
}

const ELEMENT_DATA: DeviceInterfaces[] = [
    { id: 1, name: 'Hydrogen', type: 'WAN'},
    { id: 2, name: 'Helium',  type: 'LAN'},
    { id: 3, name: 'Lithium',  type: 'WAN'},
    { id: 4, name: 'Beryllium', type: 'WAN'},
    { id: 5, name: 'Boron',  type: 'LAN'},
    { id: 6, name: 'Carbon',  type: 'WAN'},
    { id: 7, name: 'Nitrogen',  type: 'WAN'},
    { id: 8, name: 'Oxygen',  type: 'LAN'},
];


@Component({
  selector: 'app-show-tenant-topologies',
  templateUrl: './show-tenant-topologies.component.html',
  styleUrls: ['./show-tenant-topologies.component.scss']
})
export class ShowTenantTopologiesComponent implements OnInit {

  constructor() { }
  dataSource = ELEMENT_DATA;
  ngOnInit(): void {
  }

}
