import { HttpService } from './../http.service';
import { Router } from '@angular/router';
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

  constructor(private httpService: HttpService, private router: Router) {    
    if (sessionStorage.getItem('logged') !== 'SIM') 
      this.router.navigate([''])
       
    this.httpService.get('http://localhost:8000/labels/?limit=999').subscribe(data => {
      this.labelList = data['results'];
      // console.log(data['results']);      
    });
  }

  ngOnInit() {
    
  }

  createNewProject() {

    let url = 'http://localhost:8000/projects/';
    let payload = {name: this.projectName, atividades: [], label: this.labelUrl};

    this.httpService.post(url, payload).subscribe(data => {
      this.router.navigate(['projects'])
    });
  }

  createNewLabel() {
    this.router.navigate(['createlabel']);
  }
}
