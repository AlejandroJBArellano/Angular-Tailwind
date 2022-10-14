import { Component, OnInit } from '@angular/core';
import { MovementsService } from '../../services/movements.service';

export interface Res {
  id: number;
  uid: string;
  password: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  avatar: string;
  gender: string;
  phone_number: string;
  social_insurance_number: string;
  date_of_birth: string;
  employment: Employment;
  address: Address;
  credit_card: CreditCard;
  subscription: Subscription;
}

export interface Employment {
  title: string;
  key_skill: string;
}

export interface Address {
  city: string;
  street_name: string;
  street_address: string;
  zip_code: string;
  state: string;
  country: string;
  coordinates: Coordinates;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface CreditCard {
  cc_number: string;
}

export interface Subscription {
  plan: string;
  status: string;
  payment_method: string;
  term: string;
}

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.scss'],
})
export class MovementsComponent implements OnInit {
  constructor(private movementsService: MovementsService) {}
  declare users: (Res & { amount: number })[];

  ngOnInit(): void {
    this.movementsService.getUsers().subscribe((res) => {
      this.users = res.map((e) => ({
        ...e,
        amount: Math.floor(Math.random() * 169),
      }));
      console.log(this.users);
    });
  }
}
