import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { InterfaceService } from 'src/app/services/network/interface.service';

@Component({
  selector: 'app-show-interfaces',
  templateUrl: './show-interfaces.component.html',
  styleUrls: ['./show-interfaces.component.scss']
})
export class ShowInterfacesComponent implements OnInit {

  searchTerm: any;
  dataSource$!:  Observable<any[]>; 

  constructor(private service:InterfaceService) { }

  ngOnInit(): void {
    this.dataSource$ = this.service.getInterfaces();
  }

  modalTitle:string = '';
  activateAddEditInterfaceComponent:boolean = false;
  interface:any;

  modalAdd() {
    this.interface = {
      id:0,
      ipAddress:null,
      type:null,
      speed:null,
      state:null,
      protocol:null,
    }
    this.modalTitle = "Add Interface";
    this.activateAddEditInterfaceComponent = true;
  }

  modalEdit(item:any) {
    console.log(item);
    this.interface = item;
    this.modalTitle = "Edit Interface";
    this.activateAddEditInterfaceComponent = true;
  }

  delete(item:any) {
    if(confirm(`Are you sure you want to delete this interface ${item.id}`)) {
      this.service.deleteInterface(item.id).subscribe(res => {
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
    )}
  }

  modalClose() {
    this.activateAddEditInterfaceComponent = false;
    this.dataSource$ = this.service.getInterfaces();
  }

}
