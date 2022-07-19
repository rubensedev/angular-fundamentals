import { Component, OnInit } from '@angular/core';

import { Passenger } from '../../models/passenger.interface';

@Component({
  selector: 'passenger-dashboard',
  styleUrls: ['passenger-dashboard.component.scss'],
  template: `
    <div>
      <!-- one way binding passing items, we have to create that property in -->
      <!-- the passenger-count component -->
      <passenger-count [items]="passengers"></passenger-count>
      <div *ngFor="let passenger of passengers">{{ passenger.fullname }}</div>
      <passenger-detail
        *ngFor="let passenger of passengers"
        [detail]="passenger"
        (edit)="handleEdit($event)"
        (remove)="handleRemove($event)"
      ></passenger-detail>
    </div>
  `,
})
export class PassengerDashboardComponent implements OnInit {
  passengers: Passenger[] = [];
  constructor() {}
  // Angular controls what happen with data, when the component is ready Angular
  // will call this function
  ngOnInit() {
    console.log('ngOnInit');
    this.passengers = [
      {
        id: 1,
        fullname: 'Stephen',
        checkedIn: true,
        checkInDate: 1490742000000,
        children: null,
      },
      {
        id: 2,
        fullname: 'Rose',
        checkedIn: false,
        checkInDate: null,
        children: [
          { name: 'Ted', age: 12 },
          { name: 'Chloe', age: 7 },
        ],
      },
      {
        id: 3,
        fullname: 'James',
        checkedIn: true,
        checkInDate: 1491606000000,
        children: null,
      },
      {
        id: 4,
        fullname: 'Louise',
        checkedIn: true,
        checkInDate: 1488412800000,
        children: [{ name: 'Jessica', age: 1 }],
      },
      {
        id: 5,
        fullname: 'Tina',
        checkedIn: false,
        checkInDate: null,
        children: null,
      },
    ];
  }
  handleEdit(event: Passenger) {
    this.passengers = this.passengers.map((passenger: Passenger) => {
      if (passenger.id === event.id) {
        passenger = Object.assign({}, passenger, event);
      }
      return passenger;
    });
  }
  handleRemove(event: Passenger) {
    this.passengers = this.passengers.filter((passenger: Passenger) => {
      // check if id is equal to the one we clicked to filter de collection
      return passenger.id !== event.id;
    });
  }
}
