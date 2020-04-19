import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {TasksComponent} from './components/tasks/tasks.component';
import {SitesComponent} from './components/sites/sites.component';
import {RoutesComponent} from './components/routes/routes.component';
import {OnsiteComponent} from './components/onsite/onsite.component';
import {LoginComponent} from './components/login/login.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'home', component: HomeComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'sites', component: SitesComponent },
  { path: 'routes', component: RoutesComponent },
  { path: 'onsite', component: OnsiteComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
