import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { DeviceService } from 'src/app/services/network/device.service';


@Component({
  selector: 'app-show-device-interfaces',
  templateUrl: './show-device-interfaces.component.html',
  styleUrls: ['./show-device-interfaces.component.scss']
})
export class ShowDeviceInterfacesComponent implements OnInit {
  @Input() data!: Observable<any[]>; 
  interfaces!: Observable<any[]>; 

  constructor(private service: DeviceService) { }

  displayedColumns: string[] = ['id', 'ipAddress', 'type'];

  ngOnInit(): void {
    this.interfaces = this.data;
  }
  
}
