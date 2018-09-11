import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormGroup, FormControl, Validators } from '../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private loggedIn = false;

  loginForm: FormGroup;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    if(localStorage.getItem('xAuthToken') !== null) {
      this.loginService.checkSession()
        .subscribe(
          res => {
            console.log('RESPONSE');
            console.log(res);
            this.loggedIn = true;
          },
          err => {
            console.log('ERROR');
            console.log(err);
            this.loggedIn = false;
          }
        );
    }
    
    if(!this.loggedIn) {
      this.loginForm = new FormGroup({
        'username': new FormControl(null, [Validators.required]),
        'password': new FormControl(null, [Validators.required])
      });
    }
  }

  onSubmit() {
    this.loginService
        .sendCredential(this.loginForm.get('username').value, this.loginForm.get('password').value)
        .subscribe(
          (res) => {
              console.log(res);
              localStorage.setItem('xAuthToken', res['token']);
              this.loggedIn = true;
            },
          (err) => {console.log(err);}
        );
  }
}
