import { HttpService } from './../http.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {

  concluded_activities: any[] = [];
  not_concluded_activities: any[] = [];

  constructor(private httpService: HttpService, private router: Router) { 
    if (sessionStorage.getItem('logged') !== 'SIM') 
      this.router.navigate([''])
      
    this.refreshActivities();
  }

  ngOnInit() {
  }

  createNewActivity() {
    this.router.navigate(['createactivity']);
  }

  refreshActivities() {
    let projectUrl = sessionStorage.getItem('project_url');
    this.httpService.get(projectUrl).subscribe( (data) => {
        data['atividades'].forEach(element => {
          this.httpService.get(element).subscribe((data) => {
            if (data['was_concluded']) {
              this.concluded_activities.push(data);
            }else{
              this.not_concluded_activities.push(data);
            }
                              
          })
        });
      }
    );
  }

  concludeActivity(id: Number){

    let url = 'http://localhost:8000/activities/' + id;
    let payload = {was_concluded: true};
    
    this.httpService.patch(url, payload).subscribe(
      data => {
        this.concluded_activities = [];
        this.not_concluded_activities = [];
        this.refreshActivities();
      }
    )
  }

  unconcludeActivity(id: Number){
    
    let url = 'http://localhost:8000/activities/' + id;
    let payload = {was_concluded: false};

    this.httpService.patch(url, payload).subscribe(
      data => {
        this.concluded_activities = [];
        this.not_concluded_activities = [];
        this.refreshActivities();
      }
    )
  }

  goToUpdateActivity(id: string){
    sessionStorage.setItem('activityId', id);
    this.router.navigate(['updateactivity']);
  }

  deleteActivity(id: Number) {
    let url = 'http://localhost:8000/activities/' + id;
    
    this.httpService.delete(url).subscribe(
      data => {
        this.concluded_activities = [];
        this.not_concluded_activities = [];
        this.refreshActivities();
      }
    );
  }

}
