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

  constructor(
    private authService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void { }

  
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
