import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProtocolService {

  readonly protocolUrl = "http://localhost:8080/api/protocols"

  constructor(private http:HttpClient) { }

  getProtocols():Observable<any[]>{
    return this.http.get<any>(this.protocolUrl);
  }

  addProtocol(data:any) {
    return this.http.post(this.protocolUrl, data);
  }

  updateProtocol(id:number|string, data:any) {
    return this.http.put(this.protocolUrl + `/${id}`, data);
  }

  deleteProtocol(id:number|string) {
    return this.http.delete(this.protocolUrl + `/${id}`)
  }
}
