import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// we need to import Observable and map to use it below
// because we are goig to map through an obervable not an array
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Passenger } from './models/passenger.interface';

// const PASSENGER_API: string = '/assets/db.json';
// we create a new url api to use it with the library angular-in-memory-web-api
const PASSENGER_API2: string = 'api/passengers';

@Injectable()
export class PassengerDashboardService {
  // we are doing here similar to dependency injection
  constructor(private httpClient: HttpClient) {}

  getPassengers(): Observable<Passenger[]> {
    // before we had here the whole passengers collection
    // with get we type the object we are goig to "get"
    return this.httpClient.get<Passenger[]>(PASSENGER_API2).pipe(
      map((response) => response),
      catchError((err) => this.handleError(err))
    );
  }

  // get only one Passenger
  getPassenger(id: number): Observable<Passenger> {
    // before we had here the whole passengers collection
    // with get we type the object we are goig to "get"
    return this.httpClient.get<Passenger>(`${PASSENGER_API2}/${id}`).pipe(
      map((response) => response),
      catchError((err) => this.handleError(err))
    );
  }

  // we return a null becaus the library used is configure in that way, because is a local database
  updatePassengers(passenger: Passenger): Observable<null> {
    return this.httpClient
      .put<null>(`${PASSENGER_API2}/${passenger.id}`, passenger)
      .pipe(catchError((err) => this.handleError(err)));
  }

  deletePassenger(id: number): Observable<Passenger> {
    // here we don't need to pass the passenger, only the url
    return this.httpClient
      .delete<Passenger>(`${PASSENGER_API2}/${id}`)
      .pipe(catchError((err) => this.handleError(err)));
  }

  handleError(error: any): Observable<any> {
    console.log(error);
    if (error.status === 404) console.log('in');
    return throwError(error);
  }
}
