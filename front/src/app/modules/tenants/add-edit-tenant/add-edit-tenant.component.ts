import { Component, Input, OnInit } from '@angular/core';

import { TenantService } from 'src/app/services/network/tenant.service';

@Component({
  selector: 'app-add-edit-tenant',
  templateUrl: './add-edit-tenant.component.html',
  styleUrls: ['./add-edit-tenant.component.scss']
})
export class AddEditTenantComponent implements OnInit {

  @Input() tenant:any;
  id: number = 0;
  name: string = "";
  constructor(private service:TenantService) { }

  ngOnInit(): void {
    this.id = this.tenant.id;
    this.name = this.tenant.name;
  }
  addTenant() {
    var tenant = {
      name:this.name,
    }
    this.service.addTenant(tenant).subscribe(res => {
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

  updateTenant() {
   var tenant = {
      id: this.id,
      name:this.name,
    }
    var id:number = this.id;
    this.service.updateTenant(id,tenant).subscribe(res => {
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
