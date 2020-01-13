import { HttpService } from './../http.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-label',
  templateUrl: './update-label.component.html',
  styleUrls: ['./update-label.component.scss']
})
export class UpdateLabelComponent implements OnInit {

  labelName: string = '';

  constructor(private httpService: HttpService, private router: Router) {
    if (sessionStorage.getItem('logged') !== 'SIM') 
      this.router.navigate([''])
      
    let id = sessionStorage.getItem('labelId');
    // console.log(id);
    this.httpService.get('http://localhost:8000/labels/' + id).subscribe(data => {
      this.labelName = data['name'];
    });
  }

  ngOnInit() {
  }

  updateLabel() {
    let id = sessionStorage.getItem('labelId');

    let url = 'http://localhost:8000/labels/' + id + "/";
    let payload = {name: this.labelName};
    
    this.httpService.patch(url, payload).subscribe(data => {
      this.router.navigate(['projects']);
    }, err => console.log(err))
  }
}
