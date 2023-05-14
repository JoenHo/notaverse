import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  @Input() id: string = ''; // userID
  
  user: any;

  /** Constructor */
  constructor(private userService: UserService) {}

  /** OnInit hook */
  ngOnInit(): void {
    this.fetchUser()
  }

  /** Fetch user data */
  fetchUser() {
    return this.userService.getUserById(this.id).subscribe((data: any) => {
      this.user = data;
    });        
  }
}
