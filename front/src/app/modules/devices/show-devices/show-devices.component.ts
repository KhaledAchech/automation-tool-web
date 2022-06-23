import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DeviceService } from 'src/app/services/network/device.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/connection/authentication.service';


@Component({
  selector: 'app-show-devices',
  templateUrl: './show-devices.component.html',
  styleUrls: ['./show-devices.component.scss']
})
export class ShowDevicesComponent implements OnInit {
  
  dataSource$!:  Observable<any[]>; 
  protocols!: any[];

  hideAssign: boolean = false;

  constructor(private service:DeviceService,
              private authService: AuthenticationService,
              private router: Router) { }

  ngOnInit(): void {
    
     if (this.authService.isUserLoggedIn()){
        let user_token = sessionStorage.getItem("token");
        if (user_token)
        {
          let jwtData = user_token.split('.')[1]
          let decodedJwtJsonData = window.atob(jwtData)
          // Get user roles then check to see what links to hide depending on the user roles
          let user_roles = JSON.parse(decodedJwtJsonData).roles;
          if (user_roles.length === 2 || user_roles.length === 3)
          {
            this.hideAssign = false;
          }
          else{
            this.hideAssign = true;
          }
        }
    }
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
      ipAddress:null,
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
      this.load();
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
    this.service.getDevicesDetailed().subscribe(
      (res)=>{
      if (res){
        console.info("Devices Fetched Succesfully");
      }
    },
    (err)=>{
       if (err.status === 403 )
       {
         this.router.navigateByUrl('/error403');
       }
       if (err.status === 500)
       {
         this.router.navigateByUrl('/error500');
       }
    })
    this.dataSource$ = this.service.getDevicesDetailed();
  }
}
