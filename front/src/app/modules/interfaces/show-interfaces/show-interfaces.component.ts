import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-interfaces',
  templateUrl: './show-interfaces.component.html',
  styleUrls: ['./show-interfaces.component.scss']
})
export class ShowInterfacesComponent implements OnInit {

  dataSource!:  any[]; 

  constructor() { }

  ngOnInit(): void {
    this.dataSource = [
      { id: 1, ipAddress: '192.168.1.180' , type: 'IEEE 802.3', speed:'35Mbs/s', state:'Full connectivity',protocol:'TCP' },
      { id: 2, ipAddress: '192.168.1.181', type: 'IEEE 802.3', speed:'35Mbs/s', state:'Full connectivity',protocol:'TCP'},
      { id: 3, ipAddress: '192.168.1.182',  type: 'IEEE 802.3', speed:'35Mbs/s', state:'Full connectivity',protocol:'UDCP'},
      { id: 4, ipAddress: '192.168.1.183', type: 'FDDI', speed:'35Mbs/s', state:'Full connectivity',protocol:'UDCP'},
      { id: 5, ipAddress: '192.168.1.184',  type: 'FDDI', speed:'35Mbs/s', state:'Full connectivity',protocol:'UDCP'},
      { id: 6, ipAddress: '192.168.1.185',  type: 'FDDI', speed:'35Mbs/s', state:'Full connectivity',protocol:'UDCP'},
      { id: 7, ipAddress: '192.168.1.186', type: 'FDDI', speed:'35Mbs/s', state:'Full connectivity',protocol:'TCP'},
      { id: 8, ipAddress: '192.168.1.187',  type: 'Ethernet NIC', speed:'35Mbs/s', state:'Full connectivity',protocol:'TCP'},
      { id: 9, ipAddress: '192.168.1.188',  type: 'Ethernet NIC', speed:'35Mbs/s', state:'Full connectivity',protocol:'UDCP'},
      { id: 10, ipAddress: '192.168.1.189', type: 'Ethernet NIC', speed:'35Mbs/s', state:'Full connectivity',protocol:'ssh'},
      { id: 11, ipAddress: '192.168.1.190',  type: 'Wireless Network NIC', speed:'35Mbs/s', state:'Full connectivity',protocol:'ssh'},
      { id: 12, ipAddress: '192.168.1.191',  type: 'Wireless Network NIC', speed:'35Mbs/s', state:'Full connectivity',protocol:'ssh'},
      { id: 13, ipAddress: '192.168.1.192',  type: 'Wireless Network NIC', speed:'35Mbs/s', state:'Full connectivity',protocol:'ssh'},
      { id: 14, ipAddress: '192.168.1.193',  type: 'Loopback (lo)', speed:'35Mbs/s', state:'Full connectivity',protocol:'ssh'},
      { id: 15, ipAddress: '192.168.1.194',  type: 'Loopback (lo)', speed:'35Mbs/s', state:'Full connectivity',protocol:'ssh'},
      { id: 16, ipAddress: '192.168.1.195',  type: 'Loopback (lo)', speed:'35Mbs/s', state:'Full connectivity',protocol:'ssh'},
      { id: 17, ipAddress: '192.168.1.196',  type: 'Loopback (lo)', speed:'35Mbs/s', state:'Full connectivity',protocol:'ssh'},
  ];
  }

  modalTitle:string = '';
  activateAddEditInterfaceComponent:boolean = false;
  interface:any;

  modalAdd() {
    this.interface = {
      id:0,
      ipAddress:null,
      type:null,
      speed:null,
      state:null,
      protocol:null,
    }
    this.modalTitle = "Add Interface";
    this.activateAddEditInterfaceComponent = true;
  }

  modalEdit(item:any) {
    console.log(item);
    this.interface = item;
    this.modalTitle = "Edit Interface";
    this.activateAddEditInterfaceComponent = true;
  }

  delete(item:any) {
    if(confirm(`Are you sure you want to delete this interface ${item.id}`)) {

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
    this.activateAddEditInterfaceComponent = false;
  }

}
