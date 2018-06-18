
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { URL } from '../app.services';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

@Injectable()
export class UserService {
  constructor(private router: Router, private http: Http) {

  }

  getToken() {
    const headers = new Headers({
      Authorization: localStorage.getItem('token')
    });
    const options = new RequestOptions({ headers: headers });
    return options;
  }

  register(data) {
    return this.http.post(URL + 'user/register', data)
      .map((res: Response) => res.json());
  }

  login(data) {
    return this.http.post(URL + 'user/login', data)
      .map((res: Response) => res.json());
  }

  getUserByFirstName(name) {
    const token = this.getToken();
    return this.http
      .get(URL + 'user/getAllUsers/' + name, token)
      .map((res: Response) => res.json());
  }


  editProfile(data) {
    const token = this.getToken();
    return this.http.put(URL + 'user/editProfile', data, token)
      .map((res: Response) => res.json());
  }

  getUserProfile() {
    const token = this.getToken();
    return this.http
      .get(URL + 'user/getProfile/', token)
      .map((res: Response) => res.json());
  }

  deleteUser() {
    const token = this.getToken();
    return this.http.delete(URL + 'user/deleteUser', token)
      .map((res: Response) => res.json());
  }
}
