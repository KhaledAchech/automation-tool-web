import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeviceService } from 'src/app/services/network/device.service';
import { Observable } from 'rxjs';



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

  interfaces$! : Observable<any[]>; 

  protocols$! : Observable<any[]>; 

  panelOpenState = false;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    //Fetch data from the server.
    this.load();
  }


  //Load data from the backend
  load()
  {
    // Device Details : 
    this.service.getDeviceById(this.id).subscribe(res => {
      this.device = res;
    });

    // Device Protocls :
    this.protocols$ = this.service.getDeviceProtocols(this.id);

    // Device Interfaces : 
    this.interfaces$ = this.service.getDeviceInterfaces(this.id);
  }
}
