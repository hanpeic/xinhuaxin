import { Component, OnInit } from '@angular/core';
import {RequestService} from "../../services/request.service";
import {AuthenticationService} from "../../services/authentication-service.service";
import {Route} from "../../models/route";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dishome',
  templateUrl: './dishome.component.html',
  styleUrls: ['./dishome.component.scss']
})
export class DishomeComponent implements OnInit {
  routeList: Route[];
  constructor(private requestService: RequestService,
              private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.fetchRoutes();
  }

  fetchRoutes() {
    this.requestService.retrieveDishome().subscribe(res => {
      console.log(res);
      if (res.code === 100) {
        this.routeList = res.lineList;
      } else {
        this.router.navigate(['error'], {queryParams: {message: res.msg}});
      }

    }, error => {
      // this.alertService.error(error);
      console.log(error);
      const errMessage = `错误码: ${error.status}, 内容: ${error.error && error.error.msg ? error.error.msg : error.statusText }`;
      this.router.navigate(['error'], {queryParams: {message: errMessage}});
    });
  }
}
