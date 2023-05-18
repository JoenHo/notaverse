import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  user: any;

  /** Constructor */
  constructor(private userService: UserService) {}

  /** OnInit hook */
  ngOnInit(): void {
    /** Fetch user data */
    this.userService.getUser()?.subscribe((data: any) => {
      this.user = data;
    });
  }

}
