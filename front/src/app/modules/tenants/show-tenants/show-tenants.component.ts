import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-tenants',
  templateUrl: './show-tenants.component.html',
  styleUrls: ['./show-tenants.component.scss']
})
export class ShowTenantsComponent implements OnInit {

dataSource!:  any[]; 

  constructor() { }

  ngOnInit(): void {
    this.dataSource = [
      { id: 1, name: 'Cisco Systems', },
      { id: 2, name: 'Cumulus Networks',},
      { id: 3, name: 'Dell EMC',},
      { id: 4, name: 'Extreme Networks',},
      { id: 5, name: 'Juniper Networks',},
      { id: 6, name: 'Hewlett Packard Enterprise',},
      { id: 7, name: 'Netscout', },

  ];
  }

  modalTitle:string = '';
  activateAddEditTenantComponent:boolean = false;
  activateTenantTopologiesComponent:boolean = false;
  tenant:any;

  modalAdd() {
    this.tenant = {
      id:0,
      name:null,
    }
    this.modalTitle = "Add Device";
    this.activateAddEditTenantComponent = true;
  }

  modalEdit(item:any) {
    this.tenant = item;
    this.modalTitle = "Edit Device";
    this.activateAddEditTenantComponent = true;
  }

  modalTenantToplogies() {
    this.modalTitle = "Tenant list of topologies";
    this.activateTenantTopologiesComponent = true;
  }

  delete(item:any) {
    if(confirm(`Are you sure you want to delete this tenant ${item.id}`)) {

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
    this.activateAddEditTenantComponent = false;
    this.activateTenantTopologiesComponent = false;
  }
}
