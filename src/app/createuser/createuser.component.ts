import { HttpService } from './../http.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.scss']
})
export class CreateuserComponent implements OnInit {

  username: string = '';
  password: string = '';
  email: string = '';

  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit() {
  }

  createUser() {
    
    let url = 'http://localhost:8000/users/';

    const payload = {
      username: this.username,
      password: this.password,
      email: this.email
    }

    this.httpService.post(url, payload).subscribe(data => {
      this.router.navigate([''])
    }, err => { 
      if (err['error']['username']) {
        alert(err['error']['username']);
      }
      if (err['error']['email']) {
        alert(err['error']['email'])
      }
      
      console.log(err);
    })
  }

}
