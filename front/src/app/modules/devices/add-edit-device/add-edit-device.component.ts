import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-edit-device',
  templateUrl: './add-edit-device.component.html',
  styleUrls: ['./add-edit-device.component.scss']
})
export class AddEditDeviceComponent implements OnInit {
  dataSource!:  any[]; 

  @Input() device:any;
  id: number = 0;
  name: string = "";
  os: string = "";
  status: string = "";
  constructor() { }

  ngOnInit(): void {
    this.id = this.device.id;
    this.name = this.device.name;
    this.os = this.device.os;
    this.status = this.device.status;
    this.dataSource = [
      { id: 1, name: 'Hub', os: 'CatOS', status:'Connected' },
      { id: 2, name: 'Switch',  os: 'ZyNOS', status:'Disconnected' },
      { id: 3, name: 'Lithium',  os: 'ZyNOS', status:'Connected' },
      { id: 4, name: 'Router', os: 'CatOS', status:'Up' },
      { id: 5, name: 'Bridge',  os: 'LCOS', status:'Down' },
      { id: 6, name: 'Gateway',  os: 'FTOS ', status:'Connected'  },
      { id: 7, name: 'Modem',  os: 'Dell Networking Operating System', status:'Disconnected' },
      { id: 8, name: 'Repeater',  os: 'ExtremeXOS', status:'Disconnected' },
      { id: 9, name: 'Access Point',  os: 'CatOS', status:'Connected' },
      { id: 10, name: 'Hub',  os: 'ExtremeXOS', status:'Up' },
      { id: 11, name: 'Hub',  os: 'CatOS', status:'Up' },
      { id: 12, name: 'Gateway',  os: 'Cisco IOS', status:'Down' },
      { id: 13, name: 'Router',  os: 'Cisco IOS,', status:'Down' },
      { id: 14, name: 'Bridge',  os: 'Dell Networking Operating System', status:'Disconnected' },
      { id: 15, name: 'Phosphorus',  os: 'Cumulus Linux', status:'Disconnected' },
      { id: 16, name: 'Switch',  os: 'FTOS', status:'Connected' },
      { id: 17, name: 'Switch',  os: 'FTOS', status:'Connected' },
      { id: 18, name: 'Modem',  os: 'Dell Networking Operating System', status:'Up'  },
      { id: 19, name: 'Hub',  os: 'Cumulus Linux', status:'Disconnected' },
      { id: 20, name: 'Server',  os: 'Unix', status:'Down' },
  ];
  }
  addDevice() {
    var device = {
      name:this.name,
      os:this.os,
      status:'Up'
    }
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
  }

  updateDevice() {
   var device = {
      name:this.name,
      os:this.os
    }
    var id:number = this.id;
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

  }
}
