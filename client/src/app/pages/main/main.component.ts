import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  id = '42ab8ffd-2367-44fd-9568-87a19134053a';  //TODO

  constructor(private router: Router) { }

  goToHome() {
    this.router.navigate(['/home/', this.id]);
  }
}
