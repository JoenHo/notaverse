import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const SERVER_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  rooms: any;
  current_room: any;

  constructor(private http: HttpClient) { }

  setCurrentRoom(id: string) : Observable<any> {
    this.current_room = this.getRoomById(id);
    return this.current_room;
  }

  getRoomById(id: string) : Observable<any> {
    return this.http.get(SERVER_URL + '/room/' + id);
  }

  createRoom(name: string) : Observable<any> {
    const body = { name: name}
    return this.http.post(SERVER_URL + '/room', body);
  }

  updateRoom(name: string) : Observable<any> {
    const body = { name: name}
    return this.http.put(SERVER_URL + '/room', body);
  } 

  deleteRoomById(id: string) : Observable<any> {
    return this.http.delete(SERVER_URL + '/room/' + id);
  } 

}
