import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  drawerOpen = false;
  activeTab = '';
  userInfo = {};

  /** Constructor */
  constructor() {}

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
