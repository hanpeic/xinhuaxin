import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from "../../services/authentication-service.service";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  message: string;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.message = this.activatedRoute.snapshot.queryParamMap.get('message');
  }

  gotoRoute() {
    if (this.authenticationService.isDis()) {
      this.router.navigate(['dishome']);
    } else {
      this.router.navigate(['home']);
    }
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }
}
