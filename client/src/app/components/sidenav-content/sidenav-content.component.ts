import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { RoomService } from '../../services/room.service';
import { NoteService } from '../../services/note.service';
import { ElementService } from '../../services/element.service';
import { config } from 'src/app/config';

@Component({
  selector: 'app-sidenav-content',
  templateUrl: './sidenav-content.component.html',
  styleUrls: ['./sidenav-content.component.scss']
})
export class SidenavContentComponent implements OnInit{
  @Input() activeTab: any;
  
  user: any = {};
  notes: any = [];
  rooms: any = [];
  elements: any = [];
  active_room: string = '';
  active_note: string = '';
  img_url_base: string = config.ASSETS_URL;

  /** Constructor */
  constructor(
    private userService: UserService,
    private roomService: RoomService,
    private noteService: NoteService,
    private elementService: ElementService
  ) {}

  /** OnInit hook */
  ngOnInit() {
    this.userService.getUser().subscribe((data: any) => {
      this.user = data;

      // fetch room data
      this.fetchRoomData();
      
      // fetch element data
      this.fetchElementData();

      // fetch item (note) data
      this.fetchNoteData();

    });
  }

  /** Fetch room data */
  fetchRoomData() {
    this.user?.roomIdList.forEach((id:string) => {
      this.roomService.getRoomById(id).subscribe((data: any) => {
        this.rooms.push(data);
      });
    });
  }

  /** Fetch element data */
  fetchElementData() {
    this.elementService.getAllElements().subscribe((data: any) => {
      this.elements = data;
    });
  }

  /** Fetch note data */
  fetchNoteData() {
    this.user?.noteIdList.forEach((id:string) => {
      this.noteService.getNoteById(id).subscribe((data: any) => {
        this.notes.push(data);
      });      
    });
  }

  /** set active room */
  onRoomClick(room: any) {
    this.roomService.setActiveRoom(room);
    this.active_room = room.roomId;
  }

  /** set active note */
  onNoteClick(note: any) {
    this.noteService.setActiveNote(note);
    this.active_note = note.noteId;
  }

}
