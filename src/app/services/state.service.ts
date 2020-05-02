import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private _apiEndpoint: string;
  private _debugMode = false;

  constructor() { }

  get apiEndpoint() {
    return this._apiEndpoint;
  }

  set apiEndpoint(value) {
    this._apiEndpoint = value;
  }

  get debugMode(): boolean {
    return this._debugMode;
  }

  set debugMode(value: boolean) {
    this._debugMode = value;
  }
}
