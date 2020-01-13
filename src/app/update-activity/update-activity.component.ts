import { HttpService } from './../http.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-activity',
  templateUrl: './update-activity.component.html',
  styleUrls: ['./update-activity.component.scss']
})
export class UpdateActivityComponent implements OnInit {

  activityName: string = '';

  constructor(private httpService: HttpService, private router: Router) {
    if (sessionStorage.getItem('logged') !== 'SIM') 
      this.router.navigate([''])
      
    let id = sessionStorage.getItem('activityId');
    this.httpService.get('http://localhost:8000/activities/' + id).subscribe(data => {
      console.log(data);
      this.activityName = data['name'];
    });
  }

  ngOnInit() {
  }

  updateActivity() {
    let id = sessionStorage.getItem('activityId');

    let url = 'http://localhost:8000/activities/' + id;
    let payload = {name: this.activityName};

    this.httpService.patch(url, payload).subscribe(data => {
      this.router.navigate(['activities']);
    })
  }
}
