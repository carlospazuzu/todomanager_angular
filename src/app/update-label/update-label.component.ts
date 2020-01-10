import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-label',
  templateUrl: './update-label.component.html',
  styleUrls: ['./update-label.component.scss']
})
export class UpdateLabelComponent implements OnInit {

  labelName: string = '';

  constructor(private http: HttpClient, private router: Router) {
    let id = sessionStorage.getItem('labelId');
    console.log(id);
    this.http.get('http://localhost:8000/labels/' + id).subscribe(data => {
      this.labelName = data['name'];
    });
  }

  ngOnInit() {
  }

  updateLabel() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
      })
    };
    let id = sessionStorage.getItem('labelId');
    this.http.patch('http://localhost:8000/labels/' + id + "/", {name: this.labelName}, httpOptions).subscribe(data => {
      this.router.navigate(['projects']);
    }, err => console.log(err))
  }
}
