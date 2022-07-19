import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  // templateUrl: './app.component.html',  --> we can use a templateUrl too or just a template
  template: `
    <div class="app">
      <passenger-dashboard></passenger-dashboard>
    </div>
  `,
})
export class AppComponent {}
