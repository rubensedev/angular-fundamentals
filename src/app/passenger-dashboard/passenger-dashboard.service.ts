import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// we need to import Observable and map to use it below
// because we are goig to map through an obervable not an array
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Passenger } from './models/passenger.interface';

const PASSENGER_API: string = '/assets/db.json';
const PASSENGER_API2: string = 'api/passengers';

@Injectable()
export class PassengerDashboardService {
  // we are doing here similar to dependency injection
  constructor(private httpClient: HttpClient) {}

  getPassengers(): Observable<Passenger[]> {
    // before we had here the whole passengers collection
    // with get we type the object we are goig to "get"
    return this.httpClient
      .get<Passenger[]>(PASSENGER_API2)
      .pipe(map((response) => response));
  }
  // getPassengers(): Observable<Passenger[]> {
  //   // before we had here the whole passengers collection
  //   // with get we type the object we are goig to "get"
  //   return this.httpClient
  //     .get<{ passengers: Passenger[] }>(PASSENGER_API2)
  //     .pipe(
  //       map((response) => {
  //         console.log(response);
  //         return response;
  //       })
  //     );
  // }
  // updatePassengers(passenger: Passenger): Observable<Passenger> {
  //   // before we had here the whole passengers collection
  //   return this.httpClient
  //     .put(`${JSON.stringify(PASSENGER_API)}/${passenger.id}`, passenger)
  //     .pipe(map((response: any) => response.passengers));
  // }

  // we return a null becaus the library used is configure in that way, because is a local database
  updatePassengers(passenger: Passenger): Observable<null> {
    // before we had here the whole passengers collection
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //   }),
    // };

    return this.httpClient.put<null>(
      `${PASSENGER_API2}/${passenger.id}`,
      passenger
    );
  }

  deletePassenger(id: number): Observable<Passenger> {
    // before we had here the whole passengers collection
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //   }),
    // };

    return this.httpClient.delete<Passenger>(`${PASSENGER_API2}/${id}`);
  }
}
