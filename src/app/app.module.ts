import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ProjectsComponent } from './projects/projects.component';
// import { AppComponent } from './app.component';

import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ActivitiesComponent } from './activities/activities.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'activities', component: ActivitiesComponent }
  // { path: 'hero/:id',      component: HeroDetailComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    LoginComponent,
    ActivitiesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, 
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
