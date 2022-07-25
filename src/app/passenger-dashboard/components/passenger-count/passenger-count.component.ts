import { Component, Input } from '@angular/core';

import { Passenger } from '../../models/passenger.interface';

@Component({
  selector: 'passenger-count',
  template: `
    <div>
      <h3>Airline Passengers - *ngFor - [class]</h3>
      <div>Total checked in: {{ checkedInCount() }}/{{ items.length }}</div>
      <!-- we add the safe navigation (?), angular will wait to that property to be available -->
    </div>
  `,
})
export class PassengerCountComponent {
  // we use the input decorator to pass data binding to the parent container component
  @Input()
  items: Passenger[] = [];
  checkedInCount(): number {
    // if there is not items stop the program
    if (!this.items) return 0;
    return this.items.filter((passenger: Passenger) => passenger.checkedIn)
      .length;
  }
}
