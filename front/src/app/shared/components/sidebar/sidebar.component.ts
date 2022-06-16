import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/connection/authentication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  hideTopology: boolean = false;
  hideUsers: boolean = false;
  hideRoles: boolean = false;

  user_roles : string[] = [];
  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    if (this.authService.isUserLoggedIn()){
        let user_token = sessionStorage.getItem("token");
        if (user_token)
        {
          let jwtData = user_token.split('.')[1]
          let decodedJwtJsonData = window.atob(jwtData)
          // Get user roles then check to see what links to hide depending on the user roles
          let user_roles = JSON.parse(decodedJwtJsonData).roles;
          if (user_roles.length === 2 || user_roles.length === 3)
          {
            this.hideTopology = false;
            this.hideUsers = false;
            this.hideRoles = false;
          }
          else{
            this.hideTopology = true;
            this.hideUsers = true;
            this.hideRoles = true;
          }
        }
    }
  }

}
