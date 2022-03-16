import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-protocols',
  templateUrl: './show-protocols.component.html',
  styleUrls: ['./show-protocols.component.scss']
})
export class ShowProtocolsComponent implements OnInit {
 dataSource!:  any[]; 

  constructor() { }

  ngOnInit(): void {
    this.dataSource = [
      { id: 1, name: 'IPv4' , type: 'Network layer protocols', configuration:'Router(config)# router rip Router(config-router)# network 172.16.0.0' },
      { id: 2, name: 'IPv6', type: 'Network layer protocols', configuration:'ip default-gateway; ip default-network; ip route 0.0.0.0 0.0.0.0'},
      { id: 3, name: 'ICMP',  type: 'Network layer protocols', configuration:'route-map rip-to-ospf permit ' },
      { id: 4, name: 'ARP', type: 'Data link layer network protocols', configuration:'match metric 1 ' },
      { id: 5, name: 'SLIP',  type: 'Data link layer network protocols', configuration:'redistribute ospf 1 route-map 5 ' },
      { id: 6, name: 'RPC',  type: 'Session layer network protocols', configuration:'redistribute ospf 1 route-map 10 '  },
      { id: 7, name: 'TCP', type: 'Transport layer network protocols', configuration:'route-map 2 permit ' },
      { id: 8, name: 'UDP',  type: 'Transport layer network protocols', configuration:'redistribute ospf 101 ' },
      { id: 9, name: 'LPP',  type: 'Presentation layer network protocols', configuration:'set level level-2 '},
      { id: 10, name: 'SNMP', type: 'Application layer network protocols', configuration:'redistribute ospf 101 route-map 1'},
      { id: 11, name: 'Telnet',  type: 'Application layer network protocols', configuration:'route-map ospf-default permit' },
      { id: 12, name: 'SMTP',  type: 'Application layer network protocols', configuration:'router ospf 101 ' },
      { id: 13, name: 'POP3',  type: 'Application layer network protocols', configuration:'default-information originate route-map ospf-default' },
      { id: 14, name: 'HTTP',  type: 'Application layer network protocols', configuration:'distance eigrp 80 100 ' },
      { id: 15, name: 'FTP',  type: 'Application layer network protocols', configuration:'network 192.0.2.16 ' },
      { id: 16, name: 'DNS',  type: 'Application layer network protocols', configuration:'distance 120 172.16.1.3 0.0.0.0 ' },
      { id: 17, name: 'DHCP',  type: 'Application layer network protocols', configuration:'router eigrp 1 ' },
  ];
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
    this.activateAddEditProtocolComponent = false;
  }

}
