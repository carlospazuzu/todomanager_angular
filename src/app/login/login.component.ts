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

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
  }

  peido() {
    // this.router.navigateByUrl('projects');        
    
    // this.http.get('http://localhost:8000/projects/').subscribe((data) => console.log(data));
    this.http.post('http://localhost:8000/api-token', {
      username: this.username,
      password: this.password
    }).subscribe((data) => {      
      sessionStorage.setItem('dados', data.id);
      this.router.navigate(['projects']);
    },
                  err => alert('DEU BOSTA') );
                  
    
  }

}
