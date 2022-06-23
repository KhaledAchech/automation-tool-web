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
    var data = {
      'username' : this.username,
      'password' : this.password
    }
    this.service.authenticate(data).subscribe((res) => {
      if (res)
      {
        var showConnectAlert= document.getElementById('connect-success-alert');
        if(showConnectAlert) {
          showConnectAlert.style.display = "block";
        }
        setTimeout(function() {
          if(showConnectAlert) {
            showConnectAlert.style.display = "none"
          }
        }, 4000);
        this.router.navigateByUrl('/');
      }
    },
    (err)=>{
      if (err)
      {
      var showWrongCredentials = document.getElementById('wrog-credentials-alert');
      if(showWrongCredentials) {
        showWrongCredentials.style.display = "block";
        this.username = ''
        this.password = ''
      }
      setTimeout(function() {
        if(showWrongCredentials) {
          showWrongCredentials.style.display = "none"
        }
      }, 4000);
      }
    });
  }
}
