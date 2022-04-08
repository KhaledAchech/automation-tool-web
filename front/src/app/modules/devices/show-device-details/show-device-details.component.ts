import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeviceService } from 'src/app/services/network/device.service';

export interface DeviceInterfaces {
  ipAddress: string;
  id: number;
  type: string;
}

const ELEMENT_DATA: DeviceInterfaces[] = [
  {id: 1, ipAddress: '192.168.1.180', type: 'Standard Ethernet Version 2'},
  {id: 2, ipAddress: '192.168.1.180',  type: 'IEEE 802.3'},
  {id: 3, ipAddress: '192.168.1.180',  type: 'Serial Line Internet Protocol (SLIP)'},
  {id: 4, ipAddress: '192.168.1.180', type: 'FDDI.'}
];
export interface DeviceProtocols {
  name: string;
  id: number;
  type: string;
}

const ELEMENT_DATA1: DeviceProtocols[] = [
  {id: 1, name: 'IPv4', type: 'Network layer protocol	'},
  {id: 2, name: 'TCP',  type: 'Transport layer network protocol	'}
];

@Component({
  selector: 'app-show-device-details',
  templateUrl: './show-device-details.component.html',
  styleUrls: ['./show-device-details.component.scss']
})
export class ShowDeviceDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private service: DeviceService) { }

  id:any = null;
  device:any = null;
  displayedColumns: string[] = ['id', 'ipAddress', 'type'];
  dataSource = ELEMENT_DATA;

  displayedColumns1: string[] = ['id', 'ipAddress', 'type'];
  dataSource1 = ELEMENT_DATA1;
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.service.getDeviceById(this.id).subscribe(res => {
    this.device = res;
    });
  }

}
