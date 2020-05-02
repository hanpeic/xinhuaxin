import { Component, OnInit } from '@angular/core';
import {Site} from '../../models/site';
import { Router, ActivatedRoute } from '@angular/router';
import {RequestService} from '../../services/request.service';
import {AuthenticationService} from '../../services/authentication-service.service';
@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss']
})
export class SitesComponent implements OnInit {

  constructor(private requestService: RequestService,
              private activatedRoute: ActivatedRoute,
              private authenticationService: AuthenticationService) { }
  siteList: Site[];
  taskId: string;
  ngOnInit(): void {
    /*const site1 = new Site();
    site1.name = '新宝泰达';
    site1.address = '江苏-南京 南京东路400号';
    const site2 = new Site();
    site2.name = '新宝泰达新店';
    site2.address = '江苏-无锡 无锡东路200号';

    this.siteList = [];
    this.siteList.push(site1);
    this.siteList.push(site2);*/

    this.taskId = this.activatedRoute.snapshot.queryParamMap.get('taskId');
    if (this.taskId) {
      this.fetchSites(this.taskId);
    }
  }

  fetchSites(taskId) {
    this.requestService.retrieveDistributorList(taskId).subscribe(res => {
      console.log(res);
      if (res.code === 100) {
        this.siteList = res.distributorList;
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
