import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {

  activities: any[] = [];

  constructor(private http: HttpClient) { 
    let projectId = sessionStorage.getItem('project_id');
    this.http.get('http://localhost:8000/projects/' + projectId).subscribe( (data) => {
        data['atividades'].forEach(element => {
          this.http.get(element).subscribe((data) => {
               this.activities.push(data['name']);               
          })
        });
      }
    );
  }

  ngOnInit() {
  }

}
