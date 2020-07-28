import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {Route} from "../../models/route";
import {AuthenticationService} from "../../services/authentication-service.service";
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  isDis: boolean;
  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.isDis = this.authenticationService.isDis();
  }
  goto(route) {
    if (route[0] === 'home' && this.isDis) {
      this.router.navigate(['dishome']);
    } else {
      this.router.navigate(route);
    }
  }
}
