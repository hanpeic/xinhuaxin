import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { TaskComponent } from './components/task/task.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { SitesComponent } from './components/sites/sites.component';
import { SiteComponent } from './components/site/site.component';
import { RoutesComponent } from './components/routes/routes.component';
import { RouteComponent } from './components/route/route.component';
import { MenuComponent } from './components/menu/menu.component';
import { OnsiteComponent } from './components/onsite/onsite.component';
import {WebcamModule} from 'ngx-webcam';
import { SignInComponent } from './components/onsite/sign-in/sign-in.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './components/login/login.component';
import { AlertComponent } from './components/alert/alert.component';
import { MyinfoComponent } from './components/myinfo/myinfo.component';
import { QuestionComponent } from './components/question/question.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { FileComponent } from './components/question/file/file.component';
import { InfoComponent } from './components/alert/info/info.component';
import { ImageComponent } from './components/onsite/image/image.component';
import { SubmitComponent } from './components/onsite/submit/submit.component';
import { ChooseQuestionComponent } from './components/choose-question/choose-question.component';
import { PasswordComponent } from './components/myinfo/password/password.component';
import { PhotoComponent } from './components/question/photo/photo.component';
import { DemoComponent } from './components/onsite/demo/demo.component';
import { ErrorComponent } from './components/error/error.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TaskComponent,
    TasksComponent,
    SitesComponent,
    SiteComponent,
    RoutesComponent,
    RouteComponent,
    MenuComponent,
    OnsiteComponent,
    SignInComponent,
    LoginComponent,
    AlertComponent,
    MyinfoComponent,
    QuestionComponent,
    TaskDetailComponent,
    FileComponent,
    InfoComponent,
    ImageComponent,
    SubmitComponent,
    ChooseQuestionComponent,
    PasswordComponent,
    PhotoComponent,
    DemoComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    WebcamModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
   ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    InfoComponent,
    SubmitComponent,
    PasswordComponent
  ]
})
export class AppModule { }
