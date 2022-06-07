import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeviceService } from 'src/app/services/network/device.service';
import { Observable } from 'rxjs';
import { ScriptService } from 'src/app/services/network/script.service';
import { ConnectionData } from 'src/app/common/interfaces/connectionData';



@Component({
  selector: 'app-show-device-details',
  templateUrl: './show-device-details.component.html',
  styleUrls: ['./show-device-details.component.scss']
})
export class ShowDeviceDetailsComponent implements OnInit {

  modalTitle:string = '';
  activateDiscoveryComponent:boolean = false;
  activateAssignDeviceComponent:boolean = false;


  constructor(private route: ActivatedRoute,
              private service: DeviceService,
              private scriptService: ScriptService) { }

  id:any = null;
  device:any = null;
  topology_id:number = 0;
  interfaceColumns: string[] = ['id', 'ipAddress', 'type'];
  protocolColumns: string[] = ['id', 'name', 'type'];
  neighborsColumns: string[] = ['check','neighbor','neighbor_interface', 'local_interface', 'capability', 'platform']

  interfaces$! : Observable<any[]>; 

  protocols$! : Observable<any[]>; 

  neighbors$! : Observable<any[]>;
  newNeighbors$! : Observable<any[]>;


  devices:  any[] = [];

  data!: Observable<any[]>; 

  connectionData!: ConnectionData;

  neighbor: any;

  deviceId!:number;

  checkedNeighbors:  any[] = [];

  loading: boolean = false;

  panelOpenState = false;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    //Fetch data from the server.
    this.load();
  }


  //Load data from the backend
  load()
  {
    // Device Details : 
    this.service.getDeviceById(this.id).subscribe(res => {
      this.device = res;
    });

    // Device Protocls :
    this.protocols$ = this.service.getDeviceProtocols(this.id);

    // Device Interfaces : 
    this.interfaces$ = this.service.getDeviceInterfaces(this.id);

  }

  modalDiscovery() {
    this.modalTitle = "Discover Devices";
    this.activateDiscoveryComponent = true;
    // if (!this.neighbors$)
    //   this.data = this.scriptService.getDeviceNeighbors(this.id);
    // else
    //   this.data = this.neighbors$;
  }
  modalAssign(){
    this.modalTitle = "Assign Device";
    this.deviceId = this.device.id;
    this.activateAssignDeviceComponent = true;
  }

  //Load data from backend script result
  fetchNeighbors()
  {
    // Device Neighbors 
    if (!this.neighbors$)
    {
      this.neighbors$ = this.scriptService.getDeviceNeighbors(this.id);
    }
  }

  check(event: Event){

    const value = (event.target as HTMLInputElement).value;

    if(value)
      if (this.checkedNeighbors.includes(value))
        this.removeNeighbor(value)
      else
        this.checkedNeighbors.push(value)
  }

  modalClose() {
    this.activateDiscoveryComponent = false;
    this.activateAssignDeviceComponent = false;
    this.load();
  }

  removeNeighbor(doc:any){
   this.checkedNeighbors.forEach( (item, index) => {
     if(item === doc) this.checkedNeighbors.splice(index,1);
   });
  }

  addDevice() {
    if (this.checkedNeighbors)
    {
      this.checkedNeighbors.forEach(item =>{
        if (item.includes("PC"))
         {
           var deviceType = "PC"
         }
         else
         {
           if(item.includes("SW"))
           {
              var deviceType = "SWITCH"
           }
           else
           {
            if (item.includes("CP"))
              {
                var deviceType = "SERVER"
              }
            else
              {
                var deviceType = "ROUTER"
              }
           }
         }
         var device = {
          hostname: item.split(".")[0],
          type: deviceType,
          os: 'cisco_xe',
          vendor: 'cisco',
          status: 'Up'
        }
      this.service.addDevice(device).subscribe(res => {
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
      });
    })
    }
  }

connect()
  { this.loading = true;
    this.checkedNeighbors.forEach(item =>{
        if (item.includes("PC"))
         {
           var deviceType = "PC"
         }
         else
         {
           if(item.includes("SW"))
           {
              var deviceType = "SWITCH"
           }
           else
           {
            if (item.includes("CP"))
              {
                var deviceType = "SERVER"
              }
            else
              {
                var deviceType = "ROUTER"
              }
           }
         }
         var device = {
          hostname: item.split(".")[0],
          type: deviceType,
          os: 'cisco_xe',
          vendor: 'cisco',
          status: 'Connected'
        }
        this.service.addDevice(device).subscribe(res => {
          if(res)
          {
            this.neighbor = res;
            this.connectionData  = {
              "mainNodeId" : this.device.id,
              "connectNodeId" : this.neighbor.id
            }
            this.service.connect(this.device.topologyId, this.connectionData).subscribe(res =>{
                this.loading = false;
                var showConnectSuccess = document.getElementById('connection-success-alert');
                if(showConnectSuccess) {
                  showConnectSuccess.style.display = "block";
                }
                setTimeout(function() {
                  if(showConnectSuccess) {
                    showConnectSuccess.style.display = "none"
                  }
                }, 4000);
              })
          }
        })
    })
  }
}
