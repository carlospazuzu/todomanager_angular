import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-createlabel',
  templateUrl: './createlabel.component.html',
  styleUrls: ['./createlabel.component.scss']
})
export class CreatelabelComponent implements OnInit {

  labelName: string = null;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  createNewLabel() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
      })
    };
    this.http.post('http://localhost:8000/labels/', {name: this.labelName}, httpOptions).subscribe(data =>{
    console.log(data)  
    this.router.navigate(['createproject'])
    });
  }

}
