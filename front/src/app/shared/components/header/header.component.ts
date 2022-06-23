import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/connection/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  
  hideTenant: boolean = false;

  user_roles : string[] = [];

  constructor(
    private authService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
      if (this.authService.isUserLoggedIn()){
        let user_token = sessionStorage.getItem("token");
        if (user_token)
        {
          let jwtData = user_token.split('.')[1]
          let decodedJwtJsonData = window.atob(jwtData)
          // Get user roles then check to see what links to hide depending on the user roles
          let user_roles = JSON.parse(decodedJwtJsonData).roles;
          if (user_roles.length === 3)
          {
            this.hideTenant = false;
          }
          else{
            this.hideTenant = true;
          }
        }
    }
   }

  
  toggleSideBar()
    {
      this.toggleSideBarForMe.emit();
      setTimeout(() => {
       window.dispatchEvent(
         new Event('resize')
       );
     }, 300);
    }

  signout()
  {
    this.authService.logOut();
    this.router.navigateByUrl('/signin');
  }

}
