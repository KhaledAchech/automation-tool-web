import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/connection/authentication.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  username: string="";
  password: string ="";
  constructor(
    private service:AuthenticationService,
    private router: Router) { }
 
  ngOnInit(): void {
  
  }

  signin()
  {
    console.log(this.username + " " + this.password)
    var data = {
      'username' : this.username,
      'password' : this.password
    }
    this.service.authenticate(data).subscribe(res => {
      if (res)
      {
        this.router.navigateByUrl('/');
      }
    });
  }
}
