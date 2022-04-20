import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  readonly editorUrl = "http://localhost:8080/editor/diagram"

  constructor(private http:HttpClient) { }

  getDiagramById(id:number|string) {
    //return this.http.get(this.editorUrl + `/${id}`)
    return this.http.get(this.editorUrl + `/${id}`)
  }
}
