import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  readonly deviceUrl = "http://localhost:8080/api/devices"

  constructor(private http:HttpClient) { }

  getDevices():Observable<any[]>{
    return this.http.get<any>(this.deviceUrl);
  }

  addDevice(data:any) {
    return this.http.post(this.deviceUrl, data);
  }

  updateDevice(id:number|string, data:any) {
    return this.http.put(this.deviceUrl + `/${id}`, data);
  }

  deleteDevice(id:number|string) {
    return this.http.delete(this.deviceUrl + `/${id}`)
  }
}
