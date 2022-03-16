import { Component, OnInit } from '@angular/core';

export interface DeviceInterfaces {
  ipAddress: string;
  id: number;
  type: string;
}

const ELEMENT_DATA: DeviceInterfaces[] = [
  {id: 1, ipAddress: '192.168.1.180', type: 'Standard Ethernet Version 2'},
  {id: 2, ipAddress: '192.168.1.180',  type: 'IEEE 802.3'},
  {id: 3, ipAddress: '192.168.1.180',  type: 'Serial Line Internet Protocol (SLIP)'},
  {id: 4, ipAddress: '192.168.1.180', type: 'FDDI.'},
  {id: 5, ipAddress: '192.168.1.180',  type: 'Serial Optical (so)'},
  {id: 6, ipAddress: '192.168.1.180',  type: 'Loopback (lo)'},
  {id: 7, ipAddress: '192.168.1.180',  type: 'ATM (at)'},
  {id: 8, ipAddress: '192.168.1.180',  type: 'Token-ring (tr)'},
  {id: 9, ipAddress: '192.168.1.180',  type: 'Ethernet NIC'},
  {id: 10, ipAddress: '192.168.1.180',  type: 'Wireless Network NIC'},
];

@Component({
  selector: 'app-show-device-interfaces',
  templateUrl: './show-device-interfaces.component.html',
  styleUrls: ['./show-device-interfaces.component.scss']
})
export class ShowDeviceInterfacesComponent implements OnInit {

  constructor() { }
  displayedColumns: string[] = ['id', 'ipAddress', 'type'];
  dataSource = ELEMENT_DATA;
  ngOnInit(): void {
  }

}
