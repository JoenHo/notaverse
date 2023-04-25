import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  drawerOpen = false;
  drawerContent = '';
  activeButton = 0; // 1: user, 2: rooms, 3: elements, 4:items

  toggleDrawer(button_no: number) {

    // set status for drawerOpen
    if (this.activeButton == button_no){
      this.drawerOpen = !this.drawerOpen;
    } else {
      this.drawerOpen = true;
    }

    // set active button_no
    if (this.drawerOpen) {
      this.activeButton = button_no;
    } else {
      this.activeButton = 0;
    }

    // set drawer contents according to the active button
    switch (button_no) {
      case 1:
        this.drawerContent = "SHOW ACCOUNT INFO";
        break;
      case 2:
        this.drawerContent = "SHOW ROOMS";
        break;
      case 3:
        this.drawerContent = "SHOW ELEMENTS";
        break;
      case 4:
        this.drawerContent = "SHOW ITEMS";
        break;
    }
  }
}
