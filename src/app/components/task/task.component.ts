import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  constructor(private router: Router) { }

  @Input()
  task: any;
  @Input()
  showStatus: boolean;
  ngOnInit(): void {
  }

  goSites() {
    this.router.navigate(['sites']);
  }
}
