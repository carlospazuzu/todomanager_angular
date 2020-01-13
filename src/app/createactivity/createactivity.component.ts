import { HttpService } from './../http.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-createactivity',
  templateUrl: './createactivity.component.html',
  styleUrls: ['./createactivity.component.scss']
})
export class CreateactivityComponent implements OnInit {

  activityName: string;
  projectList: [] = [];

  constructor(private httpService: HttpService, private router: Router) {
    if (sessionStorage.getItem('logged') !== 'SIM') 
      this.router.navigate([''])
   }

  ngOnInit() {
    this.httpService.get('http://localhost:8000/projects/?limit=999').subscribe(data => {
      this.projectList = data['results'];      
      // console.log(data['results']);
    });
  }

  createNewActivity() {
    let projectUrl = sessionStorage.getItem('project_url');

    let url = 'http://localhost:8000/activities/';
    let payload = {name: this.activityName, project: projectUrl};

    this.httpService.post(url, payload).subscribe(data => {
      // console.log(data);
      this.router.navigate(['activities']);
    });
    
  }

}
