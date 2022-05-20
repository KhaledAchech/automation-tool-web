import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-show-discovered-devices',
  templateUrl: './show-discovered-devices.component.html',
  styleUrls: ['./show-discovered-devices.component.scss']
})
export class ShowDiscoveredDevicesComponent implements OnInit {

  constructor() { }

  @Input() data!: Observable<any[]>; 
  devices$!: Observable<any[]>; 

  ngOnInit(): void {
    this.devices$ = this.data
  }

}
