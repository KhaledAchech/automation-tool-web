import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TopologyService } from 'src/app/services/network/topology.service';

@Component({
  selector: 'app-show-topologies',
  templateUrl: './show-topologies.component.html',
  styleUrls: ['./show-topologies.component.scss']
})
export class ShowTopologiesComponent implements OnInit {

  dataSource$!:  Observable<any[]>;

  constructor(private service:TopologyService) { }

  ngOnInit(): void {
    this.dataSource$ = this.service.getTopologies();
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
       this.dataSource$ = this.service.getTopologies();
    })
    }
  }

  modalClose() {
    this.activateAddEditTopologyComponent = false;
    this.dataSource$ = this.service.getTopologies();
  }

}
