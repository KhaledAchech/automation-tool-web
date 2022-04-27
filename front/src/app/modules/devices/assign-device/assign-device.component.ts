import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TopologyService } from 'src/app/services/network/topology.service';

@Component({
  selector: 'app-assign-device',
  templateUrl: './assign-device.component.html',
  styleUrls: ['./assign-device.component.scss']
})
export class AssignDeviceComponent implements OnInit {

  dataSource$!:  Observable<any[]>;

  @Input() deviceId!:number;

  topologyId: string = "";

  constructor(private service:TopologyService) { }

  ngOnInit(): void {
    this.dataSource$ = this.service.getTopologies();
  }

   assignDevice() {
   var device = {
      id: this.deviceId
    }
    var id:number = Number(this.topologyId);
     this.service.assignDevice(id,device).subscribe(res => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn) {
        closeModalBtn.click();
      }

      var showUpdateSuccess = document.getElementById('update-success-alert');
      if(showUpdateSuccess) {
        showUpdateSuccess.style.display = "block";
      }
      setTimeout(function() {
        if(showUpdateSuccess) {
          showUpdateSuccess.style.display = "none"
        }
      }, 4000);
     })
  }
  selectTopology(event: Event)
  {
     const value = (event.target as HTMLInputElement).value;
    if(value)
      this.topologyId = value;
  }
}
