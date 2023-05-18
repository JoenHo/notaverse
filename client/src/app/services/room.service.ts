import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private selectedRoomSubject = new BehaviorSubject<any>(null);
  private active_room: any = this.selectedRoomSubject.asObservable();

  constructor(private http: HttpClient) { }

  setActiveRoom(room: any) {
    this.selectedRoomSubject.next(room);
  }

  getActiveRoom() {
    return this.active_room;
  }

  getRoomById(id: string) : Observable<any> {
    return this.http.get(config.SERVER_URL + '/room/' + id);
  }

  createRoom(name: string) : Observable<any> {
    const body = { name: name}
    return this.http.post(config.SERVER_URL + '/room', body);
  }

  updateRoom(name: string) : Observable<any> {
    const body = { name: name}
    return this.http.put(config.SERVER_URL + '/room', body);
  } 

  deleteRoomById(id: string) : Observable<any> {
    return this.http.delete(config.SERVER_URL + '/room/' + id);
  } 

}
