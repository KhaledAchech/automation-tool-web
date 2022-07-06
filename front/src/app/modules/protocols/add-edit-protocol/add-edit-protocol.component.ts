import { Component, Input, OnInit } from '@angular/core';
import { ProtocolService } from 'src/app/services/network/protocol.service';

@Component({
  selector: 'app-add-edit-protocol',
  templateUrl: './add-edit-protocol.component.html',
  styleUrls: ['./add-edit-protocol.component.scss']
})
export class AddEditProtocolComponent implements OnInit {

  @Input() protocol:any;
  id: number = 0;
  name: string = "";
  type: string = "";
  configuration: string = "";

  constructor(private service:ProtocolService) { }

  ngOnInit(): void {
    this.id = this.protocol.id;
    this.name = this.protocol.name;
    this.type = this.protocol.type;
    this.configuration = this.protocol.configuration;
  }

    addProtocol() {
    if (this.name.length>0 && this.type.length>0)
    {
      var protocol = {
        name:this.name,
        type:this.type,
        configuration:this.configuration
      }
      this.service.addProtocol(protocol).subscribe(res => {
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

    }
  }

  updateProtocol() {
    if (this.name.length>0 && this.type.length>0)
    {
      var protocol = {
        id: this.id,
        name:this.name,
        type:this.type,
        configuration:this.configuration
      }
      var id:number = this.id;
      this.service.updateProtocol(id,protocol).subscribe(res => {
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
  }
