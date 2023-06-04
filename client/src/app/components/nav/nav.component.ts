import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  user: any = null;
  userSessionInfo: any = null;

  /** Constructor */
  constructor(private userService: UserService, private router: Router) {}

  /** OnInit hook */
  ngOnInit(): void {
    /** Fetch user data */
    this.userService.getUser()?.subscribe((data: any) => {
      this.user = data;
    });
    this.userService.getUserSession()?.subscribe((data: any) => {
      this.userSessionInfo = data;
    });
  }

  logout() {
    this.user = null;
    this.userSessionInfo = null;
    this.router.navigate(['/']);
  }

}
