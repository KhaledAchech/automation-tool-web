import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProtocolService } from 'src/app/services/network/protocol.service';

@Component({
  selector: 'app-show-protocols',
  templateUrl: './show-protocols.component.html',
  styleUrls: ['./show-protocols.component.scss']
})
export class ShowProtocolsComponent implements OnInit {
  
  dataSource$!:  Observable<any[]>; 

  constructor(private service:ProtocolService) { }

  ngOnInit(): void {
    this.dataSource$ = this.service.getProtocols();
  }


  modalTitle:string = '';
  activateAddEditProtocolComponent:boolean = false;
  protocol:any;

  modalAdd() {
    this.protocol = {
      id:0,
      name:null,
      type:null,
      configuration:null
    }
    this.modalTitle = "Add Protocol";
    this.activateAddEditProtocolComponent = true;
  }

  modalEdit(item:any) {
    console.log(item);
    this.protocol = item;
    this.modalTitle = "Edit Protocol";
    this.activateAddEditProtocolComponent = true;
  }

  delete(item:any) {
    if(confirm(`Are you sure you want to delete this protocol ${item.id}`)) {
      this.service.deleteProtocol(item.id).subscribe(res => {
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
      this.dataSource$ = this.service.getProtocols();
    })
    }
  }

  modalClose() {
    this.activateAddEditProtocolComponent = false;
    this.dataSource$ = this.service.getProtocols();
  }

}
