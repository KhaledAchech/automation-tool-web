import { Component, ErrorHandler, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  selectedFile!: File;
  retrievedImage: any;
  base64Data: any;
  convertedImage: any;
  retrieveResonse: any;
  message: string = "";
  imageName: any;

  // User password from form :
  username : string = "";
  password : string = "";
  firstname: string = "";
  lastname: string = "";

  //User id
  id : number = 0;

  user_roles : string[] = [];
  constructor(private authService: AuthenticationService,
    private userService: UserService,
    private router: Router) { }

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
        this.id = this.user.id;
        if (this.user.firstname && this.user.lastname)
          this.fullname = this.user.firstname + " " + this.user.lastname;
        this.userService.getProfilePicture().subscribe((img)=>{
            if (img)
            {
              this.retrievedImage = img;
              this.base64Data = this.retrievedImage.picByte;
              this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data;
              (document.getElementById('profilePic') as HTMLImageElement).src = this.convertedImage;
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
selectImage()
{
  let input = document.createElement('input');
  input.type = 'file';
  input.accept="image/*";
  input.click();
}

public onFileChanged(event: Event) {
    //Select File
    const target= event.target as HTMLInputElement;
    if (target.files)
      this.selectedFile = target?.files[0];

    if (this.selectedFile)
    {
      //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
      const uploadImageData = new FormData();
      uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
      
      this.userService.uploadProfilePicture(uploadImageData).subscribe((res)=>{
        if (res)
        {
          this.retrievedImage = res;
          this.base64Data = this.retrievedImage.picByte;
          this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data;
          (document.getElementById('profilePic') as HTMLImageElement).src = this.convertedImage;
        }
      },
      (err)=>{
        if (err)
        {
          console.log(err);
        }
      })
    }
  
  }

  reset()
  {
    window.location.reload();
  }

  update()
  {
    //just for now then we will add form validation
    var user ;
    if (this.username && this.password)
      user = {
        username: this.username,
        password: this.password,
        firstname: this.firstname,
        lastname: this.lastname
      }
    else
      user = {
          firstname: this.firstname,
          lastname: this.lastname
        }
    var id:number = this.id;

    this.userService.updateProfile(id,user).subscribe(
      (res)=>{
        if (res)
        {
          this.authService.logOut();
          window.location.reload();
        }
    },
      (err)=>{
        console.log(err);
    })
  }
}
