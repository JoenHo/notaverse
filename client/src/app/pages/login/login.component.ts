import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  id = '42ab8ffd-2367-44fd-9568-87a19134053a';  //TODO

  constructor(private router: Router) { }

  goToHome() {
    this.router.navigate(['/home/', this.id]);
  }
}
