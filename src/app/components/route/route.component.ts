import {Component, Input, OnInit} from '@angular/core';
import {Route} from '../../models/route';
import {Router} from '@angular/router';
import {AlertService} from "../../services/alert.service";
@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.scss']
})
export class RouteComponent implements OnInit {

  constructor(private router: Router, private alertService: AlertService) { }
  @Input()
  route: Route;
  ngOnInit(): void {
  }

  goOnsite() {
    this.alertService.clear();
    const now = new Date();
    const nowTime = now.getHours() * 100 + now.getMinutes();
    const regex = new RegExp(':', 'g');
    const beginTime = this.route.begHhmm ? parseInt(this.route.begHhmm.replace(regex, ''), 10) : 0;
    const endTime = this.route.endHhmm ? parseInt(this.route.endHhmm.replace(regex, ''), 10) : 2359;
    if (nowTime < beginTime || nowTime > endTime) {
      this.alertService.alert('非执行时间');
      return;
    }
    if (this.route.isOper) {
      this.router.navigate(['onsite'], {queryParams: {lineId: this.route.lineId}});
    }
  }
}
