import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: any;

  constructor(private http: HttpClient) { }

  getUserById(id: string) : Observable<any> {
    return this.http.get(config.SERVER_URL + '/user/' + id);
  }

  setUser(id: string) {
    this.user = this.getUserById(id);
  }

  getUser() {
    return this.user;
  }

}
