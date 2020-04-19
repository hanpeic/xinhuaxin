import { Component, OnInit } from '@angular/core';
import {Subject, Observable} from 'rxjs';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import {MatDialog} from '@angular/material/dialog';
import {SignInComponent} from './sign-in/sign-in.component';
@Component({
  selector: 'app-onsite',
  templateUrl: './onsite.component.html',
  styleUrls: ['./onsite.component.scss']
})
export class OnsiteComponent implements OnInit {
  public errors: WebcamInitError[] = [];

  // latest snapshot
  public webcamImage: WebcamImage = null;

  // webcam snapshot trigger
  // private trigger: Subject<void> = new Subject<void>();
  constructor(private matDialog: MatDialog) { }

  ngOnInit(): void {
  }

  beginSignin(): void {
    const modalRef = this.matDialog.open(SignInComponent, {
      data: {}
    });
    modalRef.afterClosed().subscribe(result => {
      if (result) {
        this.webcamImage = result;
      }
    });
  }

}
