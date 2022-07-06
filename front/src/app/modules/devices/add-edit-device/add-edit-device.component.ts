import { Component, Input, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/services/network/device.service';

@Component({
  selector: 'app-add-edit-device',
  templateUrl: './add-edit-device.component.html',
  styleUrls: ['./add-edit-device.component.scss']
})
export class AddEditDeviceComponent implements OnInit {
  dataSource!:  any[]; 

  @Input() device:any;
  id: number = 0;
  ipAddress: string = "";
  hostname: string="";
  os: string = "";
  type: string = "";
  vendor: string ="";
  status: string = "Up";
  
  constructor(private service:DeviceService) { }

  ngOnInit(): void {
    this.id = this.device.id;
    this.ipAddress = this.device.ipAddress;
    this.os = this.device.os;
    this.hostname = this.device.hostname;
    this.type = this.device.type;
    this.vendor = this.device.vendor;
  }
  addDevice() {
    if (this.hostname.length>0 && this.type.length>0 && this.os.length>0)
    {
      var device = {
        ipAddress: this.ipAddress,
        hostname: this.hostname,
        type: this.type,
        os: this.os,
        vendor: this.vendor,
        status: 'Down'
      }
      this.service.addDevice(device).subscribe(res => {
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if(closeModalBtn) {
          closeModalBtn.click();
        }
  
        var showAddSuccess = document.getElementById('add-success-alert');
        if(showAddSuccess) {
          showAddSuccess.style.display = "block";
        }
        setTimeout(function() {
          if(showAddSuccess) {
            showAddSuccess.style.display = "none"
          }
        }, 4000);
      })
    }
  }
  


  updateDevice() {
  if (this.hostname.length>0 && this.type.length>0 && this.os.length>0)
  {
    var device = {
       ipAddress: this.ipAddress,
       hostname: this.hostname,
       type: this.type,
       os: this.os,
       vendor: this.vendor
     }
     var id:number = this.id;
      this.service.updateDevice(id,device).subscribe(res => {
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
  }

  selectType(event: Event)
  {
     const value = (event.target as HTMLInputElement).value;
    if(value)
      this.type = value;
  }
}
