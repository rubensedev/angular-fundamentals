import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// we need to import Observable and map to use it below
// because we are goig to map through an obervable not an array
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Passenger } from './models/passenger.interface';

const PASSENGER_API: string = '/assets/db.json';

@Injectable()
export class PassengerDashboardService {
  // we are doing here similar to dependency injection
  constructor(private httpClient: HttpClient) {}

  getPassengers(): Observable<Passenger[]> {
    // before we had here the whole passengers collection
    return this.httpClient
      .get<Passenger[]>(PASSENGER_API)
      .pipe(map((response: any) => response.passengers));
  }
  // updatePassengers(passenger: Passenger): Observable<Passenger> {
  //   // before we had here the whole passengers collection
  //   return this.httpClient
  //     .put(`${JSON.stringify(PASSENGER_API)}/${passenger.id}`, passenger)
  //     .pipe(map((response: any) => response.passengers));
  // }
  updatePassengers(passenger: Passenger): Observable<Passenger> {
    // before we had here the whole passengers collection
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.httpClient.put<Passenger>(
      PASSENGER_API,
      passenger,
      httpOptions
    );
  }
}
