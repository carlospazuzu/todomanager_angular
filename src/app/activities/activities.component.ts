import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {

  concluded_activities: any[] = [];
  not_concluded_activities: any[] = [];

  constructor(private http: HttpClient, private router: Router) { 
    this.refreshActivities();
  }

  ngOnInit() {
  }

  createNewActivity() {
    this.router.navigate(['createactivity']);
  }

  refreshActivities() {
    let projectUrl = sessionStorage.getItem('project_url');
    this.http.get(projectUrl).subscribe( (data) => {
        data['atividades'].forEach(element => {
          this.http.get(element).subscribe((data) => {
            if (data['was_concluded']) {
              this.concluded_activities.push(data);
            }else{
              this.not_concluded_activities.push(data);
            }
                              
          })
        });
      }
    );
  }

  concludeActivity(id: Number){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
      })
    };
    this.http.patch('http://localhost:8000/activities/' + id, {was_concluded: true}, httpOptions).subscribe(
      data => {
        this.concluded_activities = [];
        this.not_concluded_activities = [];
        this.refreshActivities();
      }
    )
  }

  unconcludeActivity(id: Number){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
      })
    };
    this.http.patch('http://localhost:8000/activities/' + id, {was_concluded: false}, httpOptions).subscribe(
      data => {
        this.concluded_activities = [];
        this.not_concluded_activities = [];
        this.refreshActivities();
      }
    )
  }

  goToUpdateActivity(id: string){
    sessionStorage.setItem('activityId', id);
    this.router.navigate(['updateactivity']);
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
        this.concluded_activities = [];
        this.not_concluded_activities = [];
        this.refreshActivities();
      }
    );
  }

}
