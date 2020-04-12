import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit {

  constructor() { }
  @Input()
  site: any;
  ngOnInit(): void {
  }

}
