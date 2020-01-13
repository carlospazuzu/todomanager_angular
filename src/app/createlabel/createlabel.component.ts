import { HttpService } from './../http.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-createlabel',
  templateUrl: './createlabel.component.html',
  styleUrls: ['./createlabel.component.scss']
})
export class CreatelabelComponent implements OnInit {

  labelName: string = null;

  constructor(private httpService: HttpService, private router: Router) { 
    if (sessionStorage.getItem('logged') !== 'SIM') 
      this.router.navigate([''])
  }

  ngOnInit() {
  }

  createNewLabel() {

    let url = 'http://localhost:8000/labels/';
    let payload = {name: this.labelName};
   
    this.httpService.post(url, payload).subscribe(data =>{
      // console.log(data)  
      this.router.navigate(['createproject'])
    });
  }

}
