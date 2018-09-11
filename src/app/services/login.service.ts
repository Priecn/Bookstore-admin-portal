import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { }

  sendCredential(username: string, password: string) {
    let url = 'http://localhost:8080/user/token';
    let encodedCredentials = btoa(username+":"+password);
    let basicHeader = "Basic "+encodedCredentials;
    let headers = new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', basicHeader);

    return this.http.get(url, {headers: headers});
  }

  checkSession() {
    console.log('checksession!!!');
    console.log(localStorage.getItem('xAuthToken'));
    let url = 'http://localhost:8080/user/checksession';
    if(localStorage.getItem('xAuthToken') !== null){
      let headers = new HttpHeaders()
        .set('x-auth-token', localStorage.getItem('xAuthToken'));
    return this.http.get(url, {headers: headers});
    }
  }

  logout() {
    let url = 'http://localhost:8080/user/logout';
    let headers = new HttpHeaders()
        .set('x-auth-token', localStorage.getItem('xAuthToken'));
    return this.http.post(url, {headers: headers});
  }
}
