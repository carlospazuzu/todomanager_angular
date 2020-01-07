import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ProjectsComponent } from './projects/projects.component';
// import { AppComponent } from './app.component';

import { Routes, RouterModule } from '@angular/router';
import { HeteroComponent } from './hetero/hetero.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'cu', component: AppComponent },
  { path: 'hetero', component: HeteroComponent }  
  // { path: 'hero/:id',      component: HeroDetailComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    HeteroComponent,
    LoginComponent
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
