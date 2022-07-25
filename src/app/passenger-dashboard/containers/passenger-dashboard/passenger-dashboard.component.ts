import { Component, OnInit } from '@angular/core';

import { PassengerDashboardService } from '../../passenger-dashboard.service';

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
  // dependency injection with private, we are using the service to get data
  constructor(private passengerService: PassengerDashboardService) {
    // automatically angular is doing this:
    // this.passengerService = PassengerDashboardService
    // so we can use it internally
  }
  // Angular controls what happen with data, when the component is ready Angular
  // will call this function
  ngOnInit() {
    // before we had here
    // this.passengers = [the array with all passengers data, that is now on passenger-dashboard.service.ts]
    // this.passengers = this.passengerService.getPassengers(); --> we change this line into the below line
    this.passengerService
      .getPassengers()
      .subscribe((data: Passenger[]) => (this.passengers = data));
  }
  handleEdit(event: Passenger) {
    this.passengerService
      .updatePassengers(event)
      .subscribe((data: Passenger) => {
        this.passengers = this.passengers.map((passenger: Passenger) => {
          if (passenger.id === event.id) {
            passenger = Object.assign({}, passenger, event);
          }
          return passenger;
        });
      });
  }
  handleRemove(event: Passenger) {
    this.passengers = this.passengers.filter((passenger: Passenger) => {
      // check if id is equal to the one we clicked to filter de collection
      return passenger.id !== event.id;
    });
  }
}
