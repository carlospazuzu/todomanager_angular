import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
  router: Router = null;

  currentUrl = '';

  constructor(http: HttpClient, router: Router) {
    this.http = http;
    this.router = router;

    this.currentUrl = this.router.url;

    console.log(this.router.url);
  }

  goToProjects() {
    this.router.navigate(['projects'])
  }

  logout() {
    this.router.navigate([''])
    sessionStorage.setItem('logged', 'NAO');
  }
  
}
