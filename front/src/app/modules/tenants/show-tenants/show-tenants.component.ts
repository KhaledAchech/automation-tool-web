import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TenantService } from 'src/app/services/network/tenant.service';

@Component({
  selector: 'app-show-tenants',
  templateUrl: './show-tenants.component.html',
  styleUrls: ['./show-tenants.component.scss']
})
export class ShowTenantsComponent implements OnInit {

  dataSource$!:  Observable<any[]>; 
  searchTerm: any;
  constructor(
    private service:TenantService,
    private router:Router) { }

  ngOnInit(): void {
    this.load();
  }

  modalTitle:string = '';
  activateAddEditTenantComponent:boolean = false;
  activateTenantTopologiesComponent:boolean = false;
  tenant:any;
  data:any;

  modalAdd() {
    this.tenant = {
      id:0,
      name:null,
    }
    this.modalTitle = "Add Tenant";
    this.activateAddEditTenantComponent = true;
  }

  modalEdit(item:any) {
    this.tenant = item;
    this.modalTitle = "Edit Tenant";
    this.activateAddEditTenantComponent = true;
  }

  modalTenantToplogies(data:any) {
    this.modalTitle = "Tenant list of topologies";
    this.data = data;
    this.activateTenantTopologiesComponent = true;
  }

  delete(item:any) {
    if(confirm(`Are you sure you want to delete this tenant ${item.id}`)) {
    this.service.deleteTenant(item.id).subscribe(res => {
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
    this.activateAddEditTenantComponent = false;
    this.activateTenantTopologiesComponent = false;
    this.load();
  }

  load()
  {
    this.service.getTenantsWithTopologies().subscribe(
      (res)=>{
      if (res){
        console.info("Tenants Fetched Succesfully");
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
    this.dataSource$ = this.service.getTenantsWithTopologies();
  }
}
