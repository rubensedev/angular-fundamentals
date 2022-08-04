import { Component, OnInit } from '@angular/core';

import { PassengerDashboardService } from '../../passenger-dashboard.service';

import { Passenger } from '../../models/passenger.interface';

@Component({
  selector: 'passenger-viewer',
  styleUrls: ['passenger-viewer.component.scss'],
  template: ` <div>
    <passenger-form
      [detail]="passenger"
      (update)="onUpdatePassenger($event)"
    ></passenger-form>
  </div>`,
})
export class PassengerViewerComponent implements OnInit {
  passenger!: Passenger;
  constructor(private passengerService: PassengerDashboardService) {}
  ngOnInit() {
    this.passengerService
      .getPassenger(1)
      .subscribe((passenger: Passenger) => (this.passenger = passenger));
  }
  // we are receiving the event that we emit on passenger-form.component
  onUpdatePassenger(event: Passenger) {
    // console.log(event);
    this.passengerService.updatePassengers(event).subscribe(() => {
      this.passenger = Object.assign({}, this.passenger, event);
      console.log(event);
    });
  }
}
