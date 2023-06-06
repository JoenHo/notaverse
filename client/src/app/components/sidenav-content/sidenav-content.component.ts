import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { RoomService } from '../../services/room.service';
import { NoteService } from '../../services/note.service';
import { ElementService } from '../../services/element.service';
import { DialogComponent } from '../dialog/dialog.component';
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
    private elementService: ElementService,
    private dialog: MatDialog
  ) {}

  /** OnInit hook */
  ngOnInit() {
    this.fetchUserData();
  }

  // fetch user data
  fetchUserData() {
    this.userService.getUser().subscribe((data: any) => {
      this.user = data;

      // clear lists
      this.rooms = [];
      this.elements = [];
      this.notes = [];

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
    if (this.active_room === room?.roomId) {
      // Reset the active room
      this.roomService.setActiveRoom(null);
      this.active_room = '';
    } else {
      this.roomService.setActiveRoom(room);
      this.active_room = room?.roomId;
    }
  }

  /** set active note */
  onNoteClick(note: any) {
    this.noteService.setActiveNote(note);
    this.active_note = note.noteId;

    // open dialog
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {type:'update', noteData: note, elements: this.elements, userId: this.user.userId},
      width: '80vw',
      height: '80vh'
    });

    // logic after dialog is closed
    dialogRef.afterClosed().subscribe((refreshRequired) => {
      this.active_note = '';
      if(refreshRequired == true){
        this.userService.setUser(this.user.userId);
        this.fetchUserData();      
      }
    });  
  }

  /** Open dialog to create note */
  onCreateNote() {
    // open dialog
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {type:'create', noteData: null, elements: this.elements, userId: this.user.userId},
      width: '80vw',
      height: '80vh'
    });

    // logic after dialog is closed
    dialogRef.afterClosed().subscribe((refreshRequired) => {
      this.active_note = '';
      if(refreshRequired == true){
        this.userService.setUser(this.user.userId);
        this.fetchUserData();      
      }
    }); 
  }

  /** Open dialog to create room */
  onCreateRoom() {

  }

}
