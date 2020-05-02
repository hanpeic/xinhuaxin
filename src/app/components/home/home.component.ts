import { Component, OnInit } from '@angular/core';
import {Task} from '../../models/task';
import { RequestService } from '../../services/request.service';
import { AuthenticationService } from '../../services/authentication-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  taskList: Task[];
  taskTotal: number;
  taskDoneNum: number;
  taskUndoneNum: number;
  storeTotal: number;
  storeDoneNum: number;
  storeUndoneNum: number;
  constructor(private requestService: RequestService,
              private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    /*const task1 = new Task();
    task1.id = '20190122111';
    task1.manager = '王三';
    task1.name = '奥迪门店调研项目';
    task1.period = '2020-09-11 至 2020-10-10';
    task1.phone = '13511112892';
    task1.status = '1';
    const task2 = new Task();
    task2.id = '20200122111';
    task2.manager = '王二';
    task2.name = '宝马门店调研项目';
    task2.period = '2019-09-11 至 2020-10-10';
    task2.phone = '13911112892';
    task2.status = '0';
    const task3 = new Task();
    task3.id = '20200122111';
    task3.manager = '王二';
    task3.name = '宝马门店调研项目';
    task3.period = '2019-09-11 至 2020-10-10';
    task3.phone = '13911112892';
    task3.status = '0';
    this.taskList = [];
    this.taskList.push(task1);
    this.taskList.push(task2);
    this.taskList.push(task3);*/
    this.fetchHome();
  }

  fetchHome() {
    this.requestService.retrieveHome().subscribe(res => {
      console.log(res);
      if (res.code === 100) {
        this.taskTotal = res.taskTotal;
        this.taskDoneNum = res.taskDoneNum;
        this.taskUndoneNum = res.taskUndoneNum;
        this.storeTotal = res.storeTotal;
        this.storeDoneNum = res.storeDoneNum;
        this.storeUndoneNum = res.storeUndoneNum;
        this.taskList = res.taskUndone;
      } else {
        this.authenticationService.logout();
        window.location.reload();
      }

    }, error => {
      // this.alertService.error(error);
      console.log(error);
      this.authenticationService.logout();
      window.location.reload();
    });
  }
}
