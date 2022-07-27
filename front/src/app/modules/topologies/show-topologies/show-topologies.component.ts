import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TopologyService } from 'src/app/services/network/topology.service';

@Component({
  selector: 'app-show-topologies',
  templateUrl: './show-topologies.component.html',
  styleUrls: ['./show-topologies.component.scss']
})
export class ShowTopologiesComponent implements OnInit {

  dataSource$!:  Observable<any[]>;
  searchTerm: any;

  constructor(private service:TopologyService,
              private router: Router) { }

  ngOnInit(): void {
    this.load();
  }

  modalTitle:string = '';
  activateAddEditTopologyComponent:boolean = false;
  topology:any;

  modalAdd() {
    this.topology = {
      id:0,
      name:null,
      type:null,
    }
    this.modalTitle = "Add Topology";
    this.activateAddEditTopologyComponent = true;
  }

  modalEdit(item:any) {
    console.log(item);
    this.topology = item;
    this.modalTitle = "Edit Topology";
    this.activateAddEditTopologyComponent = true;
  }

  delete(item:any) {
    if(confirm(`Are you sure you want to delete this topology ${item.id}`)) {
      this.service.deleteTopology(item.id).subscribe(res => {
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
    this.activateAddEditTopologyComponent = false;
    this.load();
  }

  load()
  {
    this.dataSource$ = this.service.getTopologies();
    this.service.getTopologies().subscribe(
      (res)=>{
      if (res){
        console.info("Topologies Fetched Succesfully");
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
  }

}
