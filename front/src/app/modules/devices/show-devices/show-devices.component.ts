import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DeviceService } from 'src/app/services/network/device.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-show-devices',
  templateUrl: './show-devices.component.html',
  styleUrls: ['./show-devices.component.scss']
})
export class ShowDevicesComponent implements OnInit {
  
  dataSource$!:  Observable<any[]>; 
  protocols!: any[];

  constructor(private service:DeviceService,
              private router: Router) { }

  ngOnInit(): void {
    this.load();
  }


  modalTitle:string = '';
  activateAddEditDeviceComponent:boolean = false;
  activateConfigureDeviceComponent:boolean = false;
  activateDeviceInterfacesComponent:boolean = false;
  activateShowDeviceDetailsComponent:boolean = false;
  activateAssignDeviceComponent:boolean = false;
  device:any;
  data!: Observable<any[]>; 
  deviceId!:number;

  modalAdd() {
    this.device = {
      id:0,
      name:null,
      os:null,
      status:'Down'
    }
    this.modalTitle = "Add Device";
    this.activateAddEditDeviceComponent = true;
  }

  modalEdit(item:any) {
    this.device = item;
    this.modalTitle = "Edit Device";
    this.activateAddEditDeviceComponent = true;
  }

  showModal(item:any) {
    this.device = item;
    this.modalTitle = "Device Details";
    this.activateShowDeviceDetailsComponent = true;
  }
  
  modalConfigure() {
    this.modalTitle = "Device Configuration";
    this.activateConfigureDeviceComponent = true;
  }

  modalAssign(item:any){
    this.modalTitle = "Assign Device";
    this.deviceId = item.id;
    this.activateAssignDeviceComponent = true;
  }
  modalDeviceInterface(item:any) {
    this.data = this.service.getDeviceInterfaces(item.id);
    this.modalTitle = "Device list of interfaces";
    this.activateDeviceInterfacesComponent = true;
  }

  delete(item:any) {
    if(confirm(`Are you sure you want to delete this device ${item.id}`)) {
      this.service.deleteDevice(item.id).subscribe(res => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn) {
        closeModalBtn.click();
      }
      var showDeleteSuccess = document.getElementById('delete-success-alert');
      if(showDeleteSuccess) {
        showDeleteSuccess.style.display = "block";
      }
      setTimeout(function() {
        if(showDeleteSuccess) {
          showDeleteSuccess.style.display = "none"
        }
      }, 4000);
      this.dataSource$ = this.service.getDevices();
    })
    }
  }

  modalClose() {
    this.activateAddEditDeviceComponent = false;
    this.activateConfigureDeviceComponent = false;
    this.activateDeviceInterfacesComponent = false;
    this.activateShowDeviceDetailsComponent = false;
    this.activateAssignDeviceComponent = false;
    this.load();
  }


  //load data from the back end 
  load()
  {
    this.dataSource$ = this.service.getDevicesDetailed();
  }
}
