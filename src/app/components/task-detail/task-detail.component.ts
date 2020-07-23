import { Component, OnInit } from '@angular/core';
import {Task} from '../../models/task';
import {RequestService} from '../../services/request.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication-service.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  task: Task;
  taskId: string;
  constructor(private requestService: RequestService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.taskId = this.activatedRoute.snapshot.queryParamMap.get('taskId');
    if (this.taskId) {
      this.fetchTask(this.taskId);
    }
  }
  fetchTask(taskId) {
    this.requestService.retrieveTaskDetails(taskId).subscribe(res => {
      console.log(res);
      if (res.code === 100) {
        this.task = res;
      } else {
        this.router.navigate(['error'], {queryParams: {message: res.msg}});
      }

    }, error => {
      // this.alertService.error(error);
      console.log(error);
      this.authenticationService.logout();
      window.location.reload();
    });
  }
}
