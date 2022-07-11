import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/connection/authentication.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.scss']
})
export class ShowUsersComponent implements OnInit {

  dataSource$!:  Observable<any[]>;
  searchTerm:any;
  role: string = '';

  modalTitle:string = '';
  activateAddEditUserComponent:boolean = false;
  user:any;

  constructor(
    private service:UserService,
    private authService: AuthenticationService,
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
    if (this.authService.isUserLoggedIn()){
        let user_token = sessionStorage.getItem("token");
        if (user_token)
        {
          let jwtData = user_token.split('.')[1]
          let decodedJwtJsonData = window.atob(jwtData)
          // Get user roles then check to see what users and roles he can fetch from the server side
          let user_roles = JSON.parse(decodedJwtJsonData).roles;
          if (user_roles.length === 3)
          {
            this.dataSource$ = this.service.getAllUsers();
          }
          else  // basicaly saying alright if you are not a CTNAS Admin then you must be a tenant admin in this case you can only see your moderators.
          {
            this.dataSource$ = this.service.getAllModerators();
          }
        }
    }

  }
  

  modalAdd() {
    this.user = {
      id:0,
      email:null,
      password:null,
      role:null
    }
    this.modalTitle = "Add User";
    this.activateAddEditUserComponent = true;
  }

  modalEdit(item:any) {
    this.user = item;
    this.modalTitle = "Edit User";
    this.activateAddEditUserComponent = true;
  }

  delete(item:any) {
    if(confirm(`Are you sure you want to delete this User ${item.id}`)) {
      this.service.deleteUser(item.id).subscribe(res => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn) {
        closeModalBtn.click();
      }
      var showDeleteSuccess = document.getElementById('delete-success-alert');
      if(showDeleteSuccess) {
        showDeleteSuccess.style.display = "block";
      }
      setTimeout(function() {
        if(showDeleteSuccess) {
          showDeleteSuccess.style.display = "none"
        }
      }, 4000);
      this.load();
    })
    }
  }

  modalClose() {
    this.activateAddEditUserComponent = false;
    this.load();
  }
}
