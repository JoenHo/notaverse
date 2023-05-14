import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Input() id: string = ''; // userID

  drawerOpen = false;
  activeTab = '';
  userInfo = {};

  /** Constructor */
  constructor(private userService : UserService) {}

  /** OnInit hook */
  ngOnInit() {}

  /** Toggle Function */
  toggleDrawer(tab: string) {

    // set status for drawerOpen
    if (this.activeTab == tab){
      this.drawerOpen = !this.drawerOpen;
    } else {
      this.drawerOpen = true;
    }

    // set active tab
    if (this.drawerOpen) {
      this.activeTab = tab;
    } else {
      this.activeTab = '';
    }

  }
}
