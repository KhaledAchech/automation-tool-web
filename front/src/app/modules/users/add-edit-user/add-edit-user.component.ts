import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/connection/authentication.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss']
})
export class AddEditUserComponent implements OnInit {

  @Input() user:any;
  id: number = 0;
  email: string = "";
  password: string = "";
  role: string = "";

  checkfield: boolean = false;

  administratorRank : number = 0;

  constructor(private service:UserService,
              private authService:AuthenticationService) { }

  ngOnInit(): void {
    this.id = this.user.id;
    this.email = this.user.email;
    this.role = this.user.role;
    if (this.authService.isUserLoggedIn()){
        let user_token = sessionStorage.getItem("token");
        if (user_token)
        {
          let jwtData = user_token.split('.')[1]
          let decodedJwtJsonData = window.atob(jwtData)
          // Get user roles then check to see what users and roles he can fetch from the server side
          let user_roles = JSON.parse(decodedJwtJsonData).roles;
          this.administratorRank = user_roles.length;
        }
      }
  }

    addUser() {
    var roles = []
    roles.push(this.role);
    if (this.role === "ROLE_MODERATOR")
    {
      roles.push(this.role);
    }
    if (this.role === "ROLE_TENANT_ADMIN")
    {
      roles.push("ROLE_MODERATOR");
      roles.push(this.role);
    }
    if (this.role === "ROLE_CTNAS_ADMIN")
    {
      roles.push("ROLE_MODERATOR");
      roles.push("ROLE_TENANT_ADMIN");
      roles.push(this.role);
    }
    var user = {
      email:this.email,
      password:this.password,
      roles:roles,
    }
    this.service.addUser(user).subscribe(res => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn) {
        closeModalBtn.click();
      }

      var showAddSuccess = document.getElementById('add-success-alert');
      if(showAddSuccess) {
        showAddSuccess.style.display = "block";
      }
      setTimeout(function() {
        if(showAddSuccess) {
          showAddSuccess.style.display = "none"
        }
      }, 4000);
    }
    )}

  //update user role
  updateUserRole() {
    var roles = []
    roles.push(this.role);
    if (this.role === "ROLE_MODERATOR")
    {
      roles.push(this.role);
    }
    if (this.role === "ROLE_TENANT_ADMIN")
    {
      roles.push("ROLE_MODERATOR");
      roles.push(this.role);
    }
    if (this.role === "ROLE_CTNAS_ADMIN")
    {
      roles.push("ROLE_MODERATOR");
      roles.push("ROLE_TENANT_ADMIN");
      roles.push(this.role);
    }
    var user = {
      id: this.id,
      roles:roles
    }
    var id:number = this.id;
    this.service.updateUserRole(id,user).subscribe(res => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn) {
        closeModalBtn.click();
      }

      var showUpdateSuccess = document.getElementById('update-success-alert');
      if(showUpdateSuccess) {
        showUpdateSuccess.style.display = "block";
      }
      setTimeout(function() {
        if(showUpdateSuccess) {
          showUpdateSuccess.style.display = "none"
        }
      }, 4000);
    }
    )}

  selectRole(event: Event)
  {
     const value = (event.target as HTMLInputElement).value;
    if(value)
      this.role = value;
  }
}
