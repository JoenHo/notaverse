import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

const SERVER_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: any;

  constructor(private http: HttpClient) { }

  getUserById(id: string) : Observable<any> {
    this.user = this.http.get(SERVER_URL + '/user/' + id);
    return this.user;
  }

}
