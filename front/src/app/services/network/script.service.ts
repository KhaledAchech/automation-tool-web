import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScriptService {

  readonly scriptUrl = "http://localhost:8080/api/dcAutomation"

  constructor(private http:HttpClient) { }

    getDeviceNeighbors(id:number|string):Observable<any[]>{
    return this.http.get<any>(this.scriptUrl + `/${id}`);
  }

}
