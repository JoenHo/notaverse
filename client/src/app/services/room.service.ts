import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

const SERVER_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private selectedRoomSubject = new BehaviorSubject<any>(null);
  rooms: any;
  active_room: any = this.selectedRoomSubject.asObservable();

  constructor(private http: HttpClient) { }

  setActiveRoom(room: any) {
    this.selectedRoomSubject.next(room);
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
