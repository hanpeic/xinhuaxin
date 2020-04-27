import { Component, OnInit } from '@angular/core';
import {Task} from '../../models/task';
import {RequestService} from '../../services/request.service';
import {AuthenticationService} from '../../services/authentication-service.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  constructor(private requestService: RequestService,
              private authenticationService: AuthenticationService) { }
  filter: string;
  taskList: Task[];
  ngOnInit(): void {
    this.filter = 'all';
    /*const task1 = new Task();
    task1.taskId = '20190122111';
    task1.pmName = '王三';
    task1.taskName = '奥迪门店调研项目';
    task1.taskBegDate = '2020-09-11'
    task1.taskEndDate = '2020-10-10';
    task1.pmPhone = '13511112892';
    task1.taskStatus = 1;
    const task2 = new Task();
    task2.taskId = '20200122111';
    task2.pmName = '王二';
    task2.taskName = '宝马门店调研项目';
    task2.taskBegDate = '2019-09-11'
    task2.taskEndDate = '2020-10-10';
    task2.pmPhone = '13911112892';
    task2.taskStatus = 0;*/
    this.taskList = [];
    // this.taskList.push(task1);
    // this.taskList.push(task2);
    this.fetchHome();
  }
  filterTask(filter: string) {
    if (this.filter !== filter) {
      this.filter = filter;
    }
  }
  fetchHome() {
    this.requestService.retrieveHome().subscribe(res => {
      console.log(res);
      if (res.code === 100) {
        this.taskList = res.taskUndone.concat(res.taskDoing);
      }

    }, error => {
      // this.alertService.error(error);
      console.log(error);
      this.authenticationService.logout();
      window.location.reload();
    });
  }
}
