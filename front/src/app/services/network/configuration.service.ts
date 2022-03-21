import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  readonly configurationUrl = "http://localhost:8080/api/configurations"

  constructor(private http:HttpClient) { }

  getConfigurations():Observable<any[]>{
    return this.http.get<any>(this.configurationUrl);
  }

  addConfiguration(data:any) {
    return this.http.post(this.configurationUrl, data);
  }

  updateConfiguration(id:number|string, data:any) {
    return this.http.put(this.configurationUrl + `/${id}`, data);
  }

  deleteConfiguration(id:number|string) {
    return this.http.delete(this.configurationUrl + `/${id}`)
  }
}
