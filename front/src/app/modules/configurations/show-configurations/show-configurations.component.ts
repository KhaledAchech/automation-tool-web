import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-configurations',
  templateUrl: './show-configurations.component.html',
  styleUrls: ['./show-configurations.component.scss']
})
export class ShowConfigurationsComponent implements OnInit {
  dataSource!:  any[]; 
  constructor() { }

  ngOnInit(): void {
    this.dataSource = [
      { id: 1, date: '01/02/2022', device : '1 : Hub' , status:'Assigned' },
      { id: 2, date: '01/02/2022', device : '2 : Router', status:'Assigned' },
      { id: 3, date: '01/02/2022',  device : 'N/A', status:'Unassigned' },
      { id: 4, date: '01/02/2022', device : '3 : Switch', status:'Assigned' },
      { id: 5, date: '01/02/2022',  device : '1 : Hub', status:'Assigned' },
      { id: 6, date: '01/02/2022',  device : 'N/A', status:'Unassigned'  },
      { id: 7, date: '01/02/2022',  device : 'N/A', status:'Unassigned' },
      { id: 8, date: '01/02/2022',  device : '1 : Hub', status:'Unassigned' },
      { id: 9, date: '01/02/2022',  device : 'N/A', status:'Unassigned' },
      { id: 10, date: '01/02/2022',  device : 'N/A', status:'Unassigned' },
      { id: 11, date: '01/02/2022',  device : 'N/A', status:'Unassigned' },
      { id: 12, date: '01/02/2022',  device : 'N/A', status:'Unassigned' },
      { id: 13, date: '01/02/2022',  device : 'N/A', status:'Unassigned' },
      { id: 14, date: '01/02/2022',  device : 'N/A', status:'Unassigned' },
      { id: 15, date: '01/02/2022',  device : 'N/A', status:'Unassigned' },
      { id: 16, date: '01/02/2022',  device : 'N/A', status:'Unassigned' },
      { id: 17, date: '01/02/2022',  device : 'N/A', status:'Unassigned' },
      { id: 18, date: '01/02/2022',  device : 'N/A', status:'Unassigned'  },
      { id: 19, date: '01/02/2022',  device : 'N/A', status:'Unassigned' },
      { id: 20, date: '01/02/2022',  device : 'N/A', status:'Unassigned' },
  ];
  }
  
  modalTitle:string = '';
  activateAddEditConfigurationComponent:boolean = false;
  activateAssignConfigurationComponent:boolean = false;
  configuration:any;

  modalAdd() {
    this.configuration = {
      id:0,
      date:null,
      device:null,
      status:'Unassigned'
    }
    this.modalTitle = "Add Configuration";
    this.activateAddEditConfigurationComponent = true;
  }

  modalEdit(item:any) {
    this.configuration = item;
    this.modalTitle = "Edit Configuration";
    this.activateAddEditConfigurationComponent = true;
  }

  modalAssign(item:any){
    this.configuration = item;
    this.modalTitle = "Assign Configuration";
    this.activateAssignConfigurationComponent = true;
  }

  delete(item:any) {
    if(confirm(`Are you sure you want to delete this configuration ${item.id}`)) {

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
    this.activateAddEditConfigurationComponent = false;
    this.activateAssignConfigurationComponent = false;
  }


}
