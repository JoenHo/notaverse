import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { RoomService } from '../../services/room.service';
import { RoomItemService } from '../../services/room-item.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
    
  room: any = Observable<any>;
  roomItems: any = [];

  /** Constructor */
  constructor(
    private roomService: RoomService,
    private roomItemService: RoomItemService,
  ) { }

  ngOnInit(): void {
    this.roomService.getActiveRoom().subscribe((room: any) => {
      this.room = room;
    });
  }

}
