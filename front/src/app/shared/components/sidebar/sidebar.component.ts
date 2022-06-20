import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/common/interfaces/user';
import { AuthenticationService } from 'src/app/services/connection/authentication.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  hideTopology: boolean = false;
  hideUsers: boolean = false;
  hideRoles: boolean = false;

  email : string = ""
  fullname : string = ""

  
  selectedFile!: File;
  retrievedImage: any;
  base64Data: any;
  convertedImage: any;
  retrieveResonse: any;

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
          // Get user roles then check to see what links to hide depending on the user roles
          let user_roles = JSON.parse(decodedJwtJsonData).roles;
          this.email = JSON.parse(decodedJwtJsonData).sub;
          this.loadUser(this.email) // => load connected user Data
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

  loadUser(username:string)
  {
     // username is the email it's a unique attribute
    this.userService.getProfile(username).subscribe((res)=>{
      if (res)
      {
        this.user = res;
        if (this.user.firstname && this.user.lastname)
          this.fullname = this.user.firstname + " " + this.user.lastname;
        this.userService.getProfilePicture().subscribe((img)=>{
            if (img)
            {
              this.retrievedImage = img;
              this.base64Data = this.retrievedImage.picByte;
              this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data;
              (document.getElementById('sideBarPic') as HTMLImageElement).src = this.convertedImage;
            }
            },
            (err)=>{
              if (err)
              {
                console.log(err);
              }
            })
      }
    })
  }
}
