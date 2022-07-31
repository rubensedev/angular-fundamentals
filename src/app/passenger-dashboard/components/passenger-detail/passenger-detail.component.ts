import {
  Component,
  OnChanges,
  Input,
  Output,
  OnInit,
  EventEmitter,
} from '@angular/core';

import { Passenger } from '../../models/passenger.interface';

@Component({
  selector: 'passenger-detail',
  styleUrls: ['passenger-detail.component.scss'],
  template: `
    <div>
      <span class="status" [class.checked-in]="detail.checkedIn"></span>
      <!-- [class] access to className  -->
      <div *ngIf="editing">
        <input
          type="text"
          [value]="detail.fullname"
          (input)="onNameChange(name.value)"
          #name
        />
      </div>
      <div *ngIf="!editing">
        {{ detail.fullname }}
      </div>
      <!-- shows the passenger object as a JSON notation -->
      <!-- <p>{{ detail | json }}</p> -->
      <div class="date">
        Check in date:
        {{
          detail.checkInDate
            ? (detail.checkInDate | date: 'd MMMM y' | uppercase)
            : 'Not checked in'
        }}
      </div>
      <div class="children">Children: {{ detail.children?.length || 0 }}</div>
      <button (click)="toggleEdit()">{{ editing ? 'Done' : 'Edit' }}</button>
      <button (click)="onRemove()">Remove</button>
    </div>
  `,
})
export class PassengerDetailComponent implements OnChanges, OnInit {
  @Input()
  // ! --> control the data type of the variable
  detail!: Passenger;

  @Output()
  edit: EventEmitter<any> = new EventEmitter();

  @Output()
  remove: EventEmitter<any> = new EventEmitter();

  // variable to activate editing mode
  editing: boolean = false;

  constructor() {}

  ngOnChanges(changes: any) {
    if (changes.detail) {
      // we merge the whole object of the current value of the change
      this.detail = Object.assign({}, changes.detail.currentValue);
    }
    // console.log('ngOnChanges');
  }

  ngOnInit() {
    // console.log('ngOnInit');
  }

  onNameChange(value: string) {
    this.detail.fullname = value;
  }

  toggleEdit() {
    if (this.editing) {
      this.edit.emit(this.detail);
    }
    // will change the edit mode
    this.editing = !this.editing;
  }

  onRemove() {
    // we are emitting the object we want to remove
    this.remove.emit(this.detail);
  }
}
