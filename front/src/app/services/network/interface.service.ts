import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterfaceService {

  readonly interfaceUrl = "http://localhost:8080/api/interfaces"

  constructor(private http:HttpClient) { }

  getInterfaces():Observable<any[]>{
    return this.http.get<any>(this.interfaceUrl);
  }

  addInterface(data:any) {
    return this.http.post(this.interfaceUrl, data);
  }

  updateInterface(id:number|string, data:any) {
    return this.http.put(this.interfaceUrl + `/${id}`, data);
  }

  deleteInterface(id:number|string) {
    return this.http.delete(this.interfaceUrl + `/${id}`)
  }
}
