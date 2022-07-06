import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/connection/authentication.service';
import { UserService } from 'src/app/services/user/user.service';
import { UserRoleForm } from 'src/app/common/interfaces/userRoleform';
import { AddUserForm } from 'src/app/common/interfaces/addUserForm';

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

  addUserForm: AddUserForm = {username : "", password : "", rolename : ""};
  userRoleForm: UserRoleForm = {username : "", rolename : ""};

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
    if (this.email.length>0 && this.password.length>0 && this.role.length>0)
    {
      this.addUserForm.username = this.email;
      this.addUserForm.password = this.password;
      this.addUserForm.rolename = this.role;
      this.service.addUserWithRoles(this.addUserForm).subscribe(res => {
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
              })

    }
  }
    

  //update user role
  updateUserRole() {
    if (this.email.length>0 && this.role.length>0)
    {
      this.userRoleForm.username = this.email;
      this.userRoleForm.rolename = this.role;
      this.service.updateUserRole(this.userRoleForm).subscribe(res => {
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
      })

    }
  }

  selectRole(event: Event)
  {
     const value = (event.target as HTMLInputElement).value;
    if(value)
      this.role = value;
  }
}
