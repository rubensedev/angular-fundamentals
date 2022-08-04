import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
@Injectable({
  providedIn: 'root',
})
export class DataService implements InMemoryDbService {
  constructor() {}
  createDb() {
    return {
      passengers: [
        {
          id: 1,
          fullname: 'Stephen',
          checkedIn: true,
          checkInDate: 1490742000000,
          baggage: 'none',
        },
        {
          id: 2,
          fullname: 'Rose',
          checkedIn: false,
          checkInDate: null,
          baggage: 'hand-only',
        },
        {
          id: 3,
          fullname: 'James',
          checkedIn: true,
          checkInDate: 1491606000000,
          baggage: 'hand-only',
        },
        {
          id: 4,
          fullname: 'Louise',
          checkedIn: true,
          checkInDate: 1488412800000,
          baggage: '',
        },
        {
          id: 5,
          fullname: 'Tina',
          checkedIn: false,
          checkInDate: null,
          baggage: '',
        },
      ],
    };
  }
}
