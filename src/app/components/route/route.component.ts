import {Component, Input, OnInit} from '@angular/core';
import {Route} from '../../models/route';
import {Router} from '@angular/router';
@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.scss']
})
export class RouteComponent implements OnInit {

  constructor(private router: Router) { }
  @Input()
  route: Route;
  ngOnInit(): void {
  }

  goOnsite() {
    this.router.navigate(['onsite'], {queryParams: {lineId: this.route.lineId}});
  }
}
