import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const SERVER_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class ElementService {
  elements: any;

  constructor(private http: HttpClient) { }

  getAllElements() : Observable<any> {
    this.elements = this.http.get(SERVER_URL + '/element');
    return this.elements;
  }
}
