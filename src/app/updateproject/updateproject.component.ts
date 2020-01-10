import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-updateproject',
  templateUrl: './updateproject.component.html',
  styleUrls: ['./updateproject.component.scss']
})
export class UpdateprojectComponent implements OnInit {

  projectName: string = '';

  constructor(private http: HttpClient, private router: Router) {
    let id = sessionStorage.getItem('projectId');
    this.http.get('http://localhost:8000/projects/' + id).subscribe(data => {
      this.projectName = data['name'];
    });
  }

  ngOnInit() {
  }

  updateProject() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
      })
    };
    let id = sessionStorage.getItem('projectId');
    this.http.patch('http://localhost:8000/projects/' + id, {name: this.projectName}, httpOptions).subscribe(data => {
      this.router.navigate(['projects']);
    })
  }
}
