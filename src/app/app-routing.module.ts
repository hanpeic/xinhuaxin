import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {TasksComponent} from './components/tasks/tasks.component';
import {SitesComponent} from './components/sites/sites.component';
import {RoutesComponent} from './components/routes/routes.component';
import {OnsiteComponent} from './components/onsite/onsite.component';
import {LoginComponent} from './components/login/login.component';
import { AuthGuard } from './services/auth.guard';
import {MyinfoComponent} from './components/myinfo/myinfo.component';
import {QuestionComponent} from './components/question/question.component';
import {TaskDetailComponent} from './components/task-detail/task-detail.component';
import {ChooseQuestionComponent} from './components/choose-question/choose-question.component';
import {ErrorComponent} from './components/error/error.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home', canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'tasks', component: TasksComponent, canActivate: [AuthGuard] },
  { path: 'sites', component: SitesComponent, canActivate: [AuthGuard] },
  { path: 'routes', component: RoutesComponent, canActivate: [AuthGuard] },
  { path: 'onsite', component: OnsiteComponent, canActivate: [AuthGuard] },
  { path: 'choose-question', component: ChooseQuestionComponent, canActivate: [AuthGuard] },
  { path: 'myinfo', component: MyinfoComponent, canActivate: [AuthGuard] },
  { path: 'question', component: QuestionComponent, canActivate: [AuthGuard] },
  { path: 'task-detail', component: TaskDetailComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'error', component: ErrorComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
