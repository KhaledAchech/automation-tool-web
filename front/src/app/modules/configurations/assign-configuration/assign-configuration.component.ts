import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-assign-configuration',
  templateUrl: './assign-configuration.component.html',
  styleUrls: ['./assign-configuration.component.scss']
})
export class AssignConfigurationComponent implements OnInit {

  @Input() 
  configuration:any;
  id: number = 0;
  date: string = "01/02/2022";
  device: string = "N/A";
  status: string = "Unassigned";

  constructor() { }

  ngOnInit(): void {
    this.id = this.configuration.id;
    this.date = this.configuration.date;
    this.device = this.configuration.device;
    this.status = this.configuration.status;
  }
  assignConfiguration() {
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
}
