import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  private loggedIn=false;

  constructor(private loginService: LoginService,
              private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('xAuthToken') !== null) {
      this.loginService.checkSession()
          .subscribe(
            res => {this.loggedIn = true;},
            err => {this.loggedIn = false;}
          );
        }
  }

  onLogout() {
    this.loginService.logout()
        .subscribe(
          res => {
            localStorage.removeItem('xAuthToken');
            location.reload();
          },
          err => console.log(`ERROR: ${err}`)
        );
    this.router.navigate(['/']);
  }

}
