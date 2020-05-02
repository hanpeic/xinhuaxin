import { Component, OnInit } from '@angular/core';
import {Route} from '../../models/route';
import {RequestService} from '../../services/request.service';
import {AuthenticationService} from '../../services/authentication-service.service';
@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss']
})
export class RoutesComponent implements OnInit {

  constructor(private requestService: RequestService,
              private authenticationService: AuthenticationService) { }
  routeList: Route[];
  otherRouteList: Route[];
  filter: string;
  ngOnInit(): void {
    /*const route1 = new Route();
    route1.name = '新宝泰达';
    route1.date = '2020-02-20';
    route1.address1 = '江苏-南京';
    route1.address2 = '南京东路400号';
    route1.status = 0;
    const route2 = new Route();
    route2.name = '新宝泰达new';
    route2.date = '2020-02-20';
    route2.address1 = '江苏-无锡';
    route2.address2 = '无锡东路400号';
    route2.status = 1;
    const route3 = new Route();
    route3.name = '新宝泰达3';
    route3.date = '2020-02-21';
    route3.address1 = '江苏-苏州';
    route3.address2 = '苏州东路400号';
    route3.status = 2;
    this.routeList = [];
    this.routeList.push(route1);
    this.routeList.push(route2);
    this.routeList.push(route3);*/

    this.filter = 'today';
    this.fetchRoutes();
  }
  filterTask(filter: string) {
    if (this.filter !== filter) {
      this.filter = filter;
    }
  }

  fetchRoutes() {
    this.requestService.retrieveLineList().subscribe(res => {
      console.log(res);
      if (res.code === 100) {
        this.routeList = res.todaysLineList;
        this.otherRouteList = res.othersLineList;
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
