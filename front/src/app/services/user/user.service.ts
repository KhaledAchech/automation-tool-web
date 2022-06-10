import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

 readonly userUrl = "http://localhost:8080/api/users"

 constructor(private http:HttpClient) { }

  getUserByUsername(username:string){
    return this.http.get(this.userUrl + `/${username}`);
  }
}
