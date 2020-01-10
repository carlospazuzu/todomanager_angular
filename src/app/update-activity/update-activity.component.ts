import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-activity',
  templateUrl: './update-activity.component.html',
  styleUrls: ['./update-activity.component.scss']
})
export class UpdateActivityComponent implements OnInit {

  activityName: string = '';

  constructor(private http: HttpClient, private router: Router) {
    let id = sessionStorage.getItem('activityId');
    this.http.get('http://localhost:8000/activities/' + id).subscribe(data => {
      console.log(data);
      this.activityName = data['name'];
    });
  }

  ngOnInit() {
  }

  updateActivity() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
      })
    };
    let id = sessionStorage.getItem('activityId');
    this.http.patch('http://localhost:8000/activities/' + id, {name: this.activityName}, httpOptions).subscribe(data => {
      this.router.navigate(['activities']);
    })
  }
}
