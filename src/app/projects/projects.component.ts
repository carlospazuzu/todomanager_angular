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
  // labelNamesArray: string[] = [];
  labelNamesDict = {};

  constructor(private http: HttpClient, private router: Router) {
    
    let id = parseInt(sessionStorage.getItem('owner_id'));

    this.http.get('http://localhost:8000/projects/?owner=' + id).subscribe(data => {
        this.projects = data['results'];   
        for (let p of this.projects) {
          let name: string = p['label'];
          this.http.get(p['label']).subscribe(data => {
            this.labelNamesDict[name] = data['name'];
          });
        }
      }      
    );    

    console.log(this.labelNamesDict);
   }

  ngOnInit() {
  }

  openActivitiesPage(projectId: string) {
    sessionStorage.setItem('project_id', projectId);
  }

  getPORRA(labelUrl) {
    return this.labelNamesDict[labelUrl];
  }

  getLabelName(labelUrl) {
    this.http.get(labelUrl)
                  .subscribe(res => {
                    this.labelNamesDict[labelUrl[labelUrl.length - 1]] = res['name'];
                  });

  }

}
