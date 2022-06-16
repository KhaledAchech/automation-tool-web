import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

 readonly userUrl = "http://localhost:8080/api/users"

 constructor(private http:HttpClient) { }

  getUserByUsername(username:string){
    return this.http.get(this.userUrl + `/${username}`);
  }

  getAllUsers():Observable<any[]>{
    return this.http.get<any>(this.userUrl);
  }
  getAllModerators():Observable<any[]>{
    return this.http.get<any>(this.userUrl + "/moderators");
  }

  addUser(data:any) {
    return this.http.post(this.userUrl, data);
  }

  updateUserRole(id:number|string, data:any) {
    return this.http.put(this.userUrl + `/${id}`, data);
  }

  deleteUser(id:number|string) {
    return this.http.delete(this.userUrl + `/${id}`)
  }
}