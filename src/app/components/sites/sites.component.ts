import { Component, OnInit } from '@angular/core';
import {Site} from '../../models/site';
@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss']
})
export class SitesComponent implements OnInit {

  constructor() { }
  siteList: Site[];
  ngOnInit(): void {
    const site1 = new Site();
    site1.name = '新宝泰达';
    site1.address = '江苏-南京 南京东路400号';
    const site2 = new Site();
    site2.name = '新宝泰达新店';
    site2.address = '江苏-无锡 无锡东路200号';

    this.siteList = [];
    this.siteList.push(site1);
    this.siteList.push(site2);
  }

}
