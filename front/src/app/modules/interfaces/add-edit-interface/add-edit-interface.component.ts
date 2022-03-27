import { Component, Input, OnInit } from '@angular/core';
import { InterfaceService } from 'src/app/services/network/interface.service';

@Component({
  selector: 'app-add-edit-interface',
  templateUrl: './add-edit-interface.component.html',
  styleUrls: ['./add-edit-interface.component.scss']
})
export class AddEditInterfaceComponent implements OnInit {

  constructor(private service:InterfaceService) { }

  @Input() interface:any;
  id: number = 0;
  ipAddress: string = "";
  type: string = "";
  //protocol: string = "";
  speed: string = "50Mbs/s";
  state: string = "Not connected";

  ngOnInit(): void {
    this.id = this.interface.id;
    this.ipAddress = this.interface.ipAddress;
    this.type = this.interface.type;
    //this.protocol = this.interface.protocol;
  }
  addInterface() {
    var anInterface = {
      ipAddress:this.ipAddress,
      type:this.type,
      speed:this.speed,
      state:this.state
    }
    this.service.addInterface(anInterface).subscribe(res => {
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
    )}
  

  updateInterface() {
    var anInterface = {
      id:this.id,
      ipAddress:this.ipAddress,
      type:this.type,
      speed:this.speed,
      state:this.state
    }
    var id:number = this.id;
    this.service.updateInterface(id,anInterface).subscribe(res => {
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
    )}
  }
