import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private selectedNoteSubject = new BehaviorSubject<any>(null);
  private active_note: any = this.selectedNoteSubject.asObservable();

  constructor(private http: HttpClient) { }

  setActiveNote(note: any) {
    this.selectedNoteSubject.next(note);
  }

  getActiveNote() {
    return this.active_note;
  }

  getNoteById(id: string) : Observable<any> {
    return this.http.get(config.SERVER_URL + '/note/' + id);
  }

  createNote(title: string, img_url: string, content: string) : Observable<any> {
    const body = {
      title: title,
      img_url: img_url,
      content: content
    }
    return this.http.post(config.SERVER_URL + '/note', body);
  }

  updateNote(title: string, img_url: string, content: string) : Observable<any> {
    const body = {
      title: title,
      img_url: img_url,
      content: content
    }
    return this.http.put(config.SERVER_URL + '/note', body);
  } 

  deleteNoteById(id: string) : Observable<any> {
    return this.http.delete(config.SERVER_URL + '/note/' + id);
  } 

}
