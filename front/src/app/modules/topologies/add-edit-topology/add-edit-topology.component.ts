import { Component, Input, OnInit } from '@angular/core';
import { TopologyService } from 'src/app/services/network/topology.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-topology',
  templateUrl: './add-edit-topology.component.html',
  styleUrls: ['./add-edit-topology.component.scss']
})
export class AddEditTopologyComponent implements OnInit {

  @Input() topology:any;
  id: number = 0;
  name: string = "";
  type: string = "";

  constructor(
    private service:TopologyService,
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.topology.id;
    this.name = this.topology.name;
    this.type = this.topology.type;
  }

    addTopology() {
    var topology = {
      name:this.name,
      type:this.type
    }
    this.service.addTopology(topology).subscribe(res => {
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
     this.router.navigateByUrl('/editor');
  }

  updateTopology() {
    var topology = {
      id: this.id,
      name:this.name,
      type:this.type
    }
    var id:number = this.id;
    this.service.updateTopology(id,topology).subscribe(res => {
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
