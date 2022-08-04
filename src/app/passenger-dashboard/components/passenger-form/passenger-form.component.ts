import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Passenger } from '../../models/passenger.interface';
import { Baggage } from '../../models/baggage.interface';

@Component({
  selector: 'passenger-form',
  styleUrls: ['passenger-form.component.scss'],
  template: `
    <!-- with ngForm we tell angular to keep track of status and data within the form -->
    <!-- with novalidate we tell the form to not validate because we are going to use angular built-in validations -->
    <form
      (ngSubmit)="handleSubmit(form.value, form.valid)"
      #form="ngForm"
      novalidate
    >
      <!-- {{ detail | json }} -->
      <div>
        Passenger name:
        <!-- with the property name we can use it as an object like -- detail.fullname -->
        <!-- ngModel it's a directive from angular, will synchronise form from the data base -->
        <!-- with [ngModel] we are creating a binding with detail, which is our Passenger -->
        <!-- with ? we wait until the value is loaded from the data base -->
        <!--  -->
        <input
          type="text"
          name="fullname"
          #fullname="ngModel"
          [ngModel]="detail?.fullname"
          required
        />
        <!-- errors? - safe operator to avoid an error in the app when null -->
        <!-- with ['required'] we access the input atributte required -->
        <!-- fullname.dirty check if the value has changed or user has interacted with it -->
        <!-- fullname.touched check if the user has click in the input and the click out -->
        <div
          *ngIf="fullname.errors?.['required'] && fullname.dirty"
          class="error"
        >
          Pasenger name is required
        </div>
        <!-- {{ fullname.errors | json }} -->
      </div>

      <div>
        Passenger ID:
        <input
          type="number"
          name="id"
          [ngModel]="detail?.id"
          #id="ngModel"
          [ngModel]="detail?.id"
          required
        />
        <div *ngIf="id.errors?.['required'] && id.dirty" class="error">
          Passenger ID is required
        </div>
        <!-- {{ id.errors | json }} -->
      </div>

      <div>
        <!-- with [value] we are passing true or false as a boolean -->
        <!-- we add a event to add a date timestamp when it's checked in -->
        <!-- <input
          id="yes"
          type="radio"
          [value]="true"
          name="checkedIn"
          [ngModel]="detail?.checkedIn"
          (ngModelChange)="toggleCheckIn($event)"
        />
        <label for="yes">Yes</label> -->
        <!-- <input
          id="no"
          type="radio"
          [value]="false"
          name="checkedIn"
          [ngModel]="detail?.checkedIn"
          (ngModelChange)="toggleCheckIn($event)"
        />
        <label for="no">No</label> -->

        <input
          id="yes"
          type="checkbox"
          name="checkedIn"
          [ngModel]="detail?.checkedIn"
          (ngModelChange)="toggleCheckIn($event)"
        />
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

      <div>
        Luggage:
        <select
          name="baggage"
          [ngModel]="detail?.baggage"
          (ngModelChange)="baggageStatus($event)"
        >
          <!-- with [selected] we are taking the vale stored in the database -->
          <option
            *ngFor="let item of baggage"
            [value]="item.key"
            [selected]="item.key === detail?.baggage"
          >
            {{ item.value }}
          </option>
        </select>
        <!-- here we have sustituted the [selected] with [ngValue] and is implemented all in the same line -->
        <!-- <select
          name="baggage"
          [ngModel]="detail?.baggage"
          (ngModelChange)="baggageStatus($event)"
        >
          with [selected] we are taking the vale stored in the database
          <option *ngFor="let item of baggage" [ngValue]="item.key">
            {{ item.value }}
          </option>
        </select> -->
      </div>

      <!-- <div>{{ form.value | json }}</div> -->
      <!-- validation state of form -->
      <!-- <div>Valid: {{ form.valid | json }}</div>
      <div>Invalid: {{ form.invalid | json }}</div> -->

      <!-- we check if the form is invalid to disable the button click -->
      <button type="submit" [disabled]="form.invalid">Update passenger</button>
    </form>
  `,
})
export class PassengerFormComponent {
  @Input()
  detail!: Passenger;

  @Output()
  // we are going to send a whole Passenger object
  update: EventEmitter<Passenger> = new EventEmitter<Passenger>();

  baggage: Baggage[] = [
    {
      key: 'none',
      value: 'No baggage',
    },
    {
      key: 'hand-only',
      value: 'Hand baggage',
    },
    {
      key: 'hold-only',
      value: 'Hold baggage',
    },
    {
      key: 'hand-hold',
      value: 'Hand and hold baggage',
    },
  ];

  toggleCheckIn(checkedIn: boolean) {
    if (checkedIn) this.detail.checkInDate = Date.now();
  }

  // this one was only added for me
  baggageStatus(value: string) {
    this.detail.baggage = value;
  }

  // we add isValid to check a 2nd level of control if the form is valid
  handleSubmit(passenger: Passenger, isValid: boolean | null) {
    if (isValid) {
      // we emit the event, the passenger, to the viewer
      this.update.emit(passenger);
    }
  }
}
