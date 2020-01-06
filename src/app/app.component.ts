import { Component } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todomanager';
  http: HttpClient = null;

  constructor(http: HttpClient) {
    this.http = http;
  }

  peido() {
    this.http.get('https://api.github.com/users/carlospazuzu').subscribe((data) => console.log(data));
  }
}
