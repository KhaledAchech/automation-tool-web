import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  readonly editorUrl = "http://localhost:8080/editor/diagram/nodes"

  constructor(private http:HttpClient) { }

  getDiagramNodesById(id:number|string):Observable<any[]>{
    //return this.http.get(this.editorUrl + `/${id}`)
    return this.http.get<any>(this.editorUrl + `/${id}`)
  }
}
