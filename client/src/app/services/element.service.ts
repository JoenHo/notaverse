import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class ElementService {
  private elements: any;

  constructor(private http: HttpClient) { }

  getAllElements() : Observable<any> {
    this.elements = this.http.get(config.SERVER_URL + '/element');
    return this.elements;
  }
}
