import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TenantService {

  readonly tenantUrl = "http://localhost:8080/api/tenants"

  constructor(private http:HttpClient) { }

  getTenants():Observable<any[]>{
    return this.http.get<any>(this.tenantUrl);
  }
  getTenantsWithTopologies():Observable<any[]>{
    return this.http.get<any>(this.tenantUrl + '/withTopologies');
  }

  addTenant(data:any) {
    return this.http.post(this.tenantUrl, data);
  }

  updateTenant(id:number|string, data:any) {
    return this.http.put(this.tenantUrl + `/${id}`, data);
  }

  deleteTenant(id:number|string) {
    return this.http.delete(this.tenantUrl + `/${id}`)
  }
}
