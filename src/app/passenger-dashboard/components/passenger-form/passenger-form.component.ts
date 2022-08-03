import { Component, Input } from '@angular/core';

import { Passenger } from '../../models/passenger.interface';

@Component({
  selector: 'passenger-form',
  styleUrls: ['passenger-form.component.scss'],
  template: `
    <!-- with ngForm we tell angular to keep track of status and data within the form -->
    <!-- with novalidate we tell the form to not validate because we are going to use angular built-in validations -->
    <form #form="ngForm" novalidate>
      {{ detail | json }}
      <div>
        Passenger name:
        <!-- with the property name we can use it as an object like -- detail.fullname -->
        <!-- it's a directive from angular, will synchronise form from the data base -->
        <!-- with [ngModel] we are creating a binding with detail, which is our Passenger -->
        <!-- with ? we wait until the value is loaded from the data base -->
        <input type="text" name="fullname" [ngModel]="detail?.fullname" />
      </div>

      <div>
        Passenger ID:
        <input type="number" name="id" [ngModel]="detail?.id" />
      </div>

      <div>
        <label for="checkedIn">
          <!-- with [value] we are passing true or false as a boolean -->
          <!-- we add a event to add a date timestamp when it's checked in -->
          <input
            type="radio"
            [value]="true"
            name="checkedIn"
            [ngModel]="detail?.checkedIn"
            (ngModelChange)="toggleCheckIn($event)"
          />
          Yes
        </label>
        <label for="checkedIn">
          <input
            type="radio"
            [value]="false"
            name="checkedIn"
            [ngModel]="detail?.checkedIn"
            (ngModelChange)="toggleCheckIn($event)"
          />
          No
        </label>
      </div>

      <!-- if the passenger has checked in, show the date timestamp -->
      <div *ngIf="form.value.checkedIn">
        Check in date:
        <input
          type="text"
          name="checkInDate"
          [ngModel]="detail?.checkInDate | date: 'd MMMM y, H:mm:ss'"
        />
      </div>

      {{ form.value | json }}
    </form>
  `,
})
export class PassengerFormComponent {
  @Input()
  detail!: Passenger;
  toggleCheckIn(checkedIn: boolean) {
    if (checkedIn) this.detail.checkInDate = Date.now();
  }
}
