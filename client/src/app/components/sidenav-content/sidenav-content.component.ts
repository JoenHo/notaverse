import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { RoomService } from '../../services/room.service';
import { RoomItemService } from '../../services/room-item.service';
import { NoteService } from '../../services/note.service';
import { ElementService } from '../../services/element.service';

@Component({
  selector: 'app-sidenav-content',
  templateUrl: './sidenav-content.component.html',
  styleUrls: ['./sidenav-content.component.scss']
})
export class SidenavContentComponent implements OnInit{
  @Input() activeTab: any;
  @Input() id: any;
  
  user: any = {};
  notes: any = [];
  rooms: any = [];
  roomItems: any = [];
  elements: any = [];
  img_url_base: string = this.elementService.assets_url;

  /** Constructor */
  constructor(
    private userService: UserService,
    private roomService: RoomService,
    private roomItemService: RoomItemService,
    private noteService: NoteService,
    private elementService: ElementService
  ) {}

  /** OnInit hook */
  ngOnInit() {
    this.userService.user.subscribe((data: any) => {
      this.user = data;
      console.log('user = ', this.user);

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

  /** fetch user data */
  fetchUser() {
    return this.userService.getUserById(this.id).subscribe((data: any) => {
      this.user = data;
    });        
  }
}
