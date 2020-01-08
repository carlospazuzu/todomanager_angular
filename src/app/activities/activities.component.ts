import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {

  activities: any[] = [];

  constructor(private http: HttpClient) { 
    this.refreshActivities();
  }

  ngOnInit() {
  }

  refreshActivities() {
    let projectId = sessionStorage.getItem('project_id');
    this.http.get('http://localhost:8000/projects/' + projectId).subscribe( (data) => {
        data['atividades'].forEach(element => {
          this.http.get(element).subscribe((data) => {
               this.activities.push(data);               
          })
        });
      }
    );
  }

  deleteActivity(id: Number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
      })
    };

    this.http.delete('http://localhost:8000/activities/' + id, httpOptions).subscribe(
      data => {
        console.log(data);
        this.activities = [];
        this.refreshActivities();
      },
      err => console.log(err)
    );
  }

}
