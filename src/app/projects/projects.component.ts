import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projects: [] = null;

  constructor(private http: HttpClient, private router: Router) {
    
    let id = parseInt(sessionStorage.getItem('owner_id'));

    this.http.get('http://localhost:8000/projects/?owner=' + id).subscribe(data => {
        this.projects = data['results'];
        
      }      
    );
    
   }

  ngOnInit() {
  }

  openActivitiesPage(projectId: string) {
    sessionStorage.setItem('project_id', projectId);
  }

}
