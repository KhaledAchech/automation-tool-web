import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiagramService {

    readonly editorUrl = "http://localhost:8080/editor/diagram"

  constructor(private http:HttpClient) { }


  getDiagramByDiagramID(id:number|string)
  {
    return this.http.get<any>(this.editorUrl + `/details/${id}`)
  }
  getDiagramNodesById(id:number|string){
    return this.http.get<any>(this.editorUrl + `/nodes/${id}`)
  }
  getDiagramLinksById(id:number|string):Observable<any[]>{
    return this.http.get<any>(this.editorUrl + `/links/${id}`)
  }
  
  getDiagramNameById(id:number|string){
    return this.http.get(this.editorUrl + `/name/${id}`)
  }

  updateDiagramById(id:number|string, data:any){
    return this.http.put(this.editorUrl + `/update/${id}`, data)
  }
}
