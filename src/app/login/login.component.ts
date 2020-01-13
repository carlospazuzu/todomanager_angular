import { HttpService } from './../http.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';

  constructor(private router: Router, private httpService: HttpService) { }

  ngOnInit() {
  }

  login() {
    // this.router.navigateByUrl('projects');        
    
    // this.http.get('http://localhost:8000/projects/').subscribe((data) => console.log(data));

    let url = 'http://localhost:8000/api-token';

    let payload = {
      username: this.username,
      password: this.password
    };

    this.httpService.post(url, payload).subscribe((data) => {      
      sessionStorage.setItem('owner_id', data['id']);      
      sessionStorage.setItem('access', data['access']);
      sessionStorage.setItem('token', data['token']);
      sessionStorage.setItem('refresh', data['refresh']);
      sessionStorage.setItem('logged', 'SIM');
      this.httpService.updateToken();
      this.router.navigate(['projects']);
    },
                  err => alert('USUARIO NAO ENCONTRADO!') )
/*
    this.http.post('http://localhost:8000/api-token', {
      username: this.username,
      password: this.password
    }).subscribe((data) => {      
      sessionStorage.setItem('owner_id', data['id']);      
      sessionStorage.setItem('access', data['access']);
      sessionStorage.setItem('token', data['token']);
      sessionStorage.setItem('refresh', data['refresh']);
      this.router.navigate(['projects']);
    },
                  err => alert('USUARIO NAO ENCONTRADO!') );
  */                
  }

  createUser() {
    this.router.navigate(['createuser'])
  }

}
