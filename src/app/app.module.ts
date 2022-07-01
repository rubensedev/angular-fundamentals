import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'; // because we are creating a browser app
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CommonModule, FormsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
