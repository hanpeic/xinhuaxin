import VConsole from 'vconsole';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = '新华信明检系统';
  ngOnInit() {
    const vconsole = new VConsole();
  }
}
