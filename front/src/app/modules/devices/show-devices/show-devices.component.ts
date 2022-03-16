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

  modalTitle:string = '';
  activateAddEditDeviceComponent:boolean = false;
  device:any;

  modalAdd() {
    this.device = {
      id:0,
      name:null,
      os:null,
      status:'down'
    }
    this.modalTitle = "Add Device";
    this.activateAddEditDeviceComponent = true;
  }

  modalEdit(item:any) {
    this.device = item;
    this.modalTitle = "Edit Device";
    this.activateAddEditDeviceComponent = true;
  }

  delete(item:any) {
    if(confirm(`Are you sure you want to delete this device ${item.id}`)) {

      /*var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn) {
        closeModalBtn.click();
      }*/
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
  }

}
