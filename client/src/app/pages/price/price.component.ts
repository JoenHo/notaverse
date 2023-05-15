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
      price: 9.99,
      features: ['Unlimited notes', 'Basic support'],
    },
    {
      name: 'Premium',
      price: 19.99,
      features: [
        'Unlimited notes',
        'Premium support',
        'Advanced features',
        'PDF export',
      ],
    },
    {
      name: 'Business',
      price: 99.99,
      features: [
        'Unlimited notes',
        'Dedicated account manager',
        'Enterprise-grade security',
        'Team collaboration',
        'Analytics and reporting',
      ],
    },
  ];

  subscribe(planName: string) {
    console.log(`Subscribing to ${planName} plan`);
  }
}
