import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/connection/authentication.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {

  email : string = ""
  fullname : string = ""

  user!: any

  user_roles : string[] = [];
  constructor(private authService: AuthenticationService,
    private userService: UserService) { }

  ngOnInit(): void {
    if (this.authService.isUserLoggedIn()){
        let user_token = sessionStorage.getItem("token");
        if (user_token)
        {
          let jwtData = user_token.split('.')[1]
          let decodedJwtJsonData = window.atob(jwtData)
          this.email = JSON.parse(decodedJwtJsonData).sub;
          this.loadUser(this.email) // => load connected user Data
        }
    }
  }

  loadUser(username:string)
  {
     // username is the email it's a unique attribute
    this.userService.getProfile(username).subscribe((res)=>{
      if (res)
      {
        this.user = res;
        this.fullname = this.user.firstname + " " + this.user.lastname
      }
    })
  }
selectImage()
{
  let input = document.createElement('input');
  input.type = 'file';
  input.accept="image/*";
  input.click();
}
}
