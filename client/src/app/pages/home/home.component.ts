import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  
  id = '';
  
  constructor(private route: ActivatedRoute) { 
    // retrieve userId from route params
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

}
