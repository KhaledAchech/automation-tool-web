import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopologyService {

  readonly topologyUrl = "http://localhost:8080/api/topologies"

  constructor(private http:HttpClient) { }

  getTopologies():Observable<any[]>{
    return this.http.get<any>(this.topologyUrl);
  }

  addTopology(data:any) {
    return this.http.post(this.topologyUrl, data);
  }

  updateTopology(id:number|string, data:any) {
    return this.http.put(this.topologyUrl + `/${id}`, data);
  }

  deleteTopology(id:number|string) {
    return this.http.delete(this.topologyUrl + `/${id}`)
  }

  assignDevice(id:number|string, data:any){
    return this.http.post(this.topologyUrl + `/${id}/addDevice`,data);
  }
}
