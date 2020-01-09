import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-createactivity',
  templateUrl: './createactivity.component.html',
  styleUrls: ['./createactivity.component.scss']
})
export class CreateactivityComponent implements OnInit {

  activityName: string;
  projectList: [] = [];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.http.get('http://localhost:8000/projects/?limit=999').subscribe(data => {
      this.projectList = data['results'];      
      // console.log(data['results']);
    });
  }

  createNewActivity() {
    let projectUrl = sessionStorage.getItem('project_url');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
      })
    };

    this.http.post('http://localhost:8000/activities/', {name: this.activityName, project: projectUrl}, httpOptions).subscribe(data => {
      console.log(data);
      this.router.navigate(['activities']);
    });

    
  }

}
