import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-createproject',
  templateUrl: './createproject.component.html',
  styleUrls: ['./createproject.component.scss']
})
export class CreateprojectComponent implements OnInit {

  projectName: string = '';
  labelList: [] = [];
  labelUrl: string = '';

  constructor(private http: HttpClient, private router: Router) {     
    this.http.get('http://localhost:8000/labels/?limit=999').subscribe(data => {
      this.labelList = data['results'];
      console.log(data['results']);      
    });
  }

  ngOnInit() {
    
  }

  createNewProject() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
      })
    };

    this.http.post('http://localhost:8000/projects/', {name: this.projectName, atividades: [], label: this.labelUrl}, httpOptions).subscribe(data => {
      this.router.navigate(['projects'])
    });
  }

  createNewLabel() {
    this.router.navigate(['createlabel']);
  }
}
