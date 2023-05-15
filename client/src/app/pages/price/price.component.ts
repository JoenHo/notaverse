import { Component } from '@angular/core';

interface Plan {
  name: string;
  price: number;
  features: string[];
}

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss'],
})
export class PriceComponent {
  plans: Plan[] = [
    {
      name: 'Basic',
      price: 0,
      features: ['Limited notes', 'Basic support'],
    },
    {
      name: 'Premium',
      price: 4.99,
      features: ['Unlimited notes', 'Premium support', 'Advanced features'],
    },
    {
      name: 'Business',
      price: 19.99,
      features: [
        'Unlimited notes',
        'PDF export',
        'Team collaboration',
        'Analytics and reporting',
      ],
    },
  ];

  subscribe(planName: string) {
    console.log(`Subscribing to ${planName} plan`);
  }
}
