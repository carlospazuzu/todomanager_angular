import { Component } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todomanager';

  username: string = '';
  password: string = '';

  http: HttpClient = null;

  constructor(http: HttpClient) {
    this.http = http;
  }

  peido() {
    // this.http.get('http://localhost:8000/projects/').subscribe((data) => console.log(data));
    this.http.post('http://localhost:8000/api/token/', {
      username: this.username,
      password: this.password
    }).subscribe((data) => console.log(data));
  }
}
