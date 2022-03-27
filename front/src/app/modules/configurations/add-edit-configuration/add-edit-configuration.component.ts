import { Component, Input, OnInit } from '@angular/core';
import { ConfigurationService } from 'src/app/services/network/configuration.service';

@Component({
  selector: 'app-add-edit-configuration',
  templateUrl: './add-edit-configuration.component.html',
  styleUrls: ['./add-edit-configuration.component.scss']
})
export class AddEditConfigurationComponent implements OnInit {

  @Input() configuration:any;
  id: number = 0;
  date: string = "01/02/2022";
  device: string = "N/A";
  status: string = "Unassigned";

  constructor(private service:ConfigurationService) {  }

  ngOnInit(): void {
    this.id = this.configuration.id;
    this.date = this.configuration.date;
    this.device = this.configuration.device;
    this.status = this.configuration.status;
  }

   addConfiguration() {
      /*var configuration = {
      date:this.date,
      device:this.device,
      status:'Unassigned'
    }*/
      ///this.service.addConfiguration(configuration).subscribe(res => {
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
    //)}
  }

  updateConfiguration() {
      /*var configuration = {
        id:this.id,
      date:this.date,
      device:this.device,
      status:'Unassigned'
    }*/
      ///this.service.updateConfiguration(id,configuration).subscribe(res => {
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
      //)}
  }
}
