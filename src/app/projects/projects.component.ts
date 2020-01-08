import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projects: [] = null;

  constructor(private http: HttpClient) {
    
    let id = parseInt(sessionStorage.getItem('owner_id'));

    this.http.get('http://localhost:8000/projects/?owner=' + id).subscribe(data => {
        this.projects = data['results'];
        
      }      
    );
    
   }

  ngOnInit() {
  }

}
