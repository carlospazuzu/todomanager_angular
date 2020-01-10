import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    this.refreshProjects();  
  }

  ngOnInit() {
  }

  refreshProjects() {
    let id = parseInt(sessionStorage.getItem('owner_id'));

    this.http.get('http://localhost:8000/projects/?owner=' + id + '&limit=999').subscribe(data => {
        this.projects = data['results'];   
        for (let p of this.projects) {
          let name: string = p['label'];
          this.http.get(p['label']).subscribe(data => {
            this.labelNamesDict[name] = data['name'];
          });
        }
      }      
    );
  }

  deleteProject(projectId: Number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
      })
    };

    this.http.delete('http://localhost:8000/projects/' + projectId, httpOptions).subscribe(
      data => {
        console.log(data);
        this.projects = [];
        this.refreshProjects();
      },
      err => console.log(err)
    );
  }

  createNewProject() {
    this.router.navigate(['createproject']);
  }

  goToUpdateProject(id: string) {
    sessionStorage.setItem('projectId', id);
    this.router.navigate(['updateproject']);
  }

  goToUpdateLabel(labelUrl: string) {
    this.http.get(labelUrl).subscribe(data => {
      sessionStorage.setItem('labelId', data['id']);
      this.router.navigate(['updatelabel']);
    });
  }

  openActivitiesPage(projectUrl: string) {
    sessionStorage.setItem('project_url', projectUrl);
  }

  getLabelName(labelUrl) {
    this.http.get(labelUrl)
                  .subscribe(res => {
                    this.labelNamesDict[labelUrl[labelUrl.length - 1]] = res['name'];
                  });

  }

}
