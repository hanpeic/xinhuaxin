import VConsole from 'vconsole';
import { Component, OnInit } from '@angular/core';
import {StateService} from './services/state.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = '新华信明检系统';
  constructor(public stateService: StateService) {
  }
  ngOnInit() {
    this.stateService.apiEndpoint = document.querySelector('#apiEndpoint').getAttribute('value');
    this.stateService.debugMode = document.querySelector('#debugMode').getAttribute('value') === 'true';
    if (this.stateService.debugMode) {
      const vconsole = new VConsole();
    }
  }
}
