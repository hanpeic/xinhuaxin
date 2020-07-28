import { Component, OnInit } from '@angular/core';
import {RequestService} from "../../services/request.service";
import {AuthenticationService} from "../../services/authentication-service.service";
import {Route} from "../../models/route";

@Component({
  selector: 'app-dishome',
  templateUrl: './dishome.component.html',
  styleUrls: ['./dishome.component.scss']
})
export class DishomeComponent implements OnInit {
  routeList: Route[];
  constructor(private requestService: RequestService,
              private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.fetchRoutes();
  }

  fetchRoutes() {
    this.requestService.retrieveDishome().subscribe(res => {
      console.log(res);
      if (res.code === 100) {
        this.routeList = res.lineList;
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
