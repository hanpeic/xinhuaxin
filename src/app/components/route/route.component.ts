import {Component, Input, OnInit} from '@angular/core';
import {Route} from '../../models/route';
import {Router} from '@angular/router';
import {AlertService} from "../../services/alert.service";
import {AuthenticationService} from "../../services/authentication-service.service";
@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.scss']
})
export class RouteComponent implements OnInit {
  isDis: boolean;
  constructor(private router: Router, private alertService: AlertService, private authenticationService: AuthenticationService) { }
  @Input()
  route: Route;
  ngOnInit(): void {
    this.isDis = this.authenticationService.isDis();
  }

  goOnsite() {
    this.alertService.clear();
    const now = new Date();
    /*const nowTime = now.getHours() * 100 + now.getMinutes();
    const regex = new RegExp(':', 'g');
    const beginTime = this.route.begHhmm ? parseInt(this.route.begHhmm.replace(regex, ''), 10) : 0;
    const endTime = this.route.endHhmm ? parseInt(this.route.endHhmm.replace(regex, ''), 10) : 2359;
    if (nowTime < beginTime || nowTime > endTime) {
      this.alertService.alert('非执行时间');
      return;
    }*/
    if (this.route.begHhmm && this.route.endHhmm) {
      const beginTime = new Date(this.route.surveyDate + ' ' + this.route.begHhmm);
      const endTime = new Date(this.route.surveyDate + ' ' + this.route.endHhmm);
      if (now < beginTime || now > endTime) {
        this.alertService.alert('非执行时间');
        return;
      }
    }
    if (this.route.isOper === undefined || this.route.isOper) {
      this.router.navigate(['onsite'], {queryParams: {lineId: this.route.lineId}});
    }
  }
}
