import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-edit-interface',
  templateUrl: './add-edit-interface.component.html',
  styleUrls: ['./add-edit-interface.component.scss']
})
export class AddEditInterfaceComponent implements OnInit {

  constructor() { }

  @Input() interface:any;
  id: number = 0;
  ipAddress: string = "";
  type: string = "";
  protocol: string = "";
  speed: string = "0Mbs/s";
  state: string = "Not connected";

  ngOnInit(): void {
    this.id = this.interface.id;
    this.ipAddress = this.interface.ipAddress;
    this.type = this.interface.type;
    this.state = this.interface.state;
    this.speed = this.interface.speed;
    this.protocol = this.interface.protocol;
  }
  addInterface() {
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

  updateInterface() {
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
