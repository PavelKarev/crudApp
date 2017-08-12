import { Http } from '@angular/http';
import { User } from '../../user/user';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs';

import { environment } from '../../../environments/environment';

const url = environment.URL;


@Injectable()
export class UserService {
  private url = url;
  
  constructor(private _http: Http) { }

  create(user: User) {
    return this._http.post(`${this.url}/users`, user)
    .map(data => data.json()).toPromise()
  }

  destroy(user: User) {
    return this._http.delete(`${this.url}/users/${user._id}`)
    .map(data => data.json()).toPromise()

  }

  update(user: User) {
    return this._http.put(`${this.url}/users/${user._id}`, user)
    .map(data => data.json()).toPromise()

  }

  getUsers() {
    return this._http.get(`${this.url}/users`)
    .map(data => data.json()).toPromise()

  }

  getUser(user: User) {
    return this._http.get(`${this.url}/users/${user._id}`)
    .map(data => data.json()).toPromise()

  }
}
