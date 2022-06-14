import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.scss']
})
export class ShowUsersComponent implements OnInit {

  dataSource$!:  Observable<any[]>; 
  role: string = '';

  constructor(
    private service:UserService,
    private router:Router) { }

  ngOnInit(): void {
    this.load();
  }

  load()
  {
    this.service.getAllUsers().subscribe(
    (res)=>
    {
      if (res){
        console.log("Users fetched successfully")
      }
    },
    (err)=>
    {
      if (err.status === 403 )
       {
         this.router.navigateByUrl('/error403');
       }
       if (err.status === 500)
       {
         this.router.navigateByUrl('/error500');
       }
    }
    );
    this.dataSource$ = this.service.getAllUsers();
  }

}
