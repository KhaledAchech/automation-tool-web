import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-devices',
  templateUrl: './show-devices.component.html',
  styleUrls: ['./show-devices.component.scss']
})
export class ShowDevicesComponent implements OnInit {
  
  dataSource!:  any[]; 

  constructor() { }

  ngOnInit(): void {
    this.dataSource = [
      { id: 1, name: 'Hub',protocols : ['ssh','smtp'] ,os: 'CatOS', status:'Connected' },
      { id: 2, name: 'Switch', protocols : ['https','smtp'] ,os: 'ZyNOS', status:'Disconnected' },
      { id: 3, name: 'Lithium',  protocols : ['ssh'], os: 'ZyNOS', status:'Connected' },
      { id: 4, name: 'Router', protocols : ['ssh'],os: 'CatOS', status:'Up' },
      { id: 5, name: 'Bridge',  protocols : ['smtp'],os: 'LCOS', status:'Down' },
      { id: 6, name: 'Gateway',  protocols : ['ssh','smtp'],os: 'FTOS ', status:'Connected'  },
      { id: 7, name: 'Modem',  protocols : ['ssh'],os: 'Dell Networking Operating System', status:'Disconnected' },
      { id: 8, name: 'Repeater',  protocols : ['https','smtp'],os: 'ExtremeXOS', status:'Disconnected' },
      { id: 9, name: 'Access Point',  protocols : ['https','smtp'],os: 'CatOS', status:'Connected' },
      { id: 10, name: 'Hub',  protocols : ['https','smtp'],os: 'ExtremeXOS', status:'Up' },
      { id: 11, name: 'Hub',  protocols : ['ssh','smtp'],os: 'CatOS', status:'Up' },
      { id: 12, name: 'Gateway',  protocols : ['https','smtp'],os: 'Cisco IOS', status:'Down' },
      { id: 13, name: 'Router',  protocols : ['ssh','smtp'],os: 'Cisco IOS,', status:'Down' },
      { id: 14, name: 'Bridge',  protocols : ['ssh','https'],os: 'Dell Networking Operating System', status:'Disconnected' },
      { id: 15, name: 'Phosphorus',  protocols : ['https','smtp'],os: 'Cumulus Linux', status:'Disconnected' },
      { id: 16, name: 'Switch',  protocols : ['ssh'],os: 'FTOS', status:'Connected' },
      { id: 17, name: 'Switch',  protocols : ['https'],os: 'FTOS', status:'Connected' },
      { id: 18, name: 'Modem',  protocols : ['ssh'],os: 'Dell Networking Operating System', status:'Up'  },
      { id: 19, name: 'Hub',  protocols : ['ssh','https','smtp'],os: 'Cumulus Linux', status:'Disconnected' },
      { id: 20, name: 'Server',  protocols : ['https'],os: 'Unix', status:'Down' },
  ];
  }

  modalTitle:string = '';
  activateAddEditDeviceComponent:boolean = false;
  activateConfigureDeviceComponent:boolean = false;
  activateDeviceInterfacesComponent:boolean = false;
  device:any;

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

  modalConfigure() {
    this.modalTitle = "Device Configuration";
    this.activateConfigureDeviceComponent = true;
  }
  modalDeviceInterface() {
    this.modalTitle = "Device list of interfaces";
    this.activateDeviceInterfacesComponent = true;
  }

  delete(item:any) {
    if(confirm(`Are you sure you want to delete this device ${item.id}`)) {

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

    }
  }

  modalClose() {
    this.activateAddEditDeviceComponent = false;
    this.activateConfigureDeviceComponent = false;
    this.activateDeviceInterfacesComponent = false;
  }

}
