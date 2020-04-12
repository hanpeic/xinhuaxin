import { Component, OnInit } from '@angular/core';
import {Task} from '../../models/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  constructor() { }
  filter: string;
  taskList: Task[];
  ngOnInit(): void {
    this.filter = 'all';
    const task1 = new Task();
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
    this.taskList = [];
    this.taskList.push(task1);
    this.taskList.push(task2);
  }
  filterTask(filter: string) {
    if (this.filter !== filter) {
      this.filter = filter;
    }
  }
}
