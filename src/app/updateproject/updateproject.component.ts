import { HttpService } from './../http.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-updateproject',
  templateUrl: './updateproject.component.html',
  styleUrls: ['./updateproject.component.scss']
})
export class UpdateprojectComponent implements OnInit {

  projectName: string = '';

  constructor(private httpService: HttpService, private router: Router) {
    if (sessionStorage.getItem('logged') !== 'SIM') 
      this.router.navigate([''])
      
    let id = sessionStorage.getItem('projectId');
    this.httpService.get('http://localhost:8000/projects/' + id).subscribe(data => {
      this.projectName = data['name'];
    });
  }

  ngOnInit() {
  }

  updateProject() {
    let id = sessionStorage.getItem('projectId');

    let url = 'http://localhost:8000/projects/' + id;
    let payload = {name: this.projectName};

    this.httpService.patch(url, payload).subscribe(data => {
      this.router.navigate(['projects']);
    })
  }
}
