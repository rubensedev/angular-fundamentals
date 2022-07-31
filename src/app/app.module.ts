import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'; // because we are creating a browser app
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PassengerDashboardModule } from './passenger-dashboard/passenger-dashboard.module';

import { AppComponent } from './app.component';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { DataService } from './data.services';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    PassengerDashboardModule,
    HttpClientInMemoryWebApiModule.forRoot(DataService),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
