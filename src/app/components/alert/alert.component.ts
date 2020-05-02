import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from '../../services/alert.service';
import {MatDialog} from '@angular/material/dialog';
import {InfoComponent} from './info/info.component';
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  private subscription: Subscription;
  message: any;
  constructor(private alertService: AlertService,
              private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.subscription = this.alertService.getAlert()
      .subscribe(message => {
        switch (message && message.type) {
          case 'success':
            message.cssClass = 'alert alert-success';
            break;
          case 'error':
            message.cssClass = 'alert alert-danger';
            break;
          case 'alert':
            const modalRef = this.matDialog.open(InfoComponent, {
              minWidth: '250px',
              data: {
                message: message.text
              }
            });
            break;
        }
        this.message = message;
        if (message && message.type === 'alert') {
          this.message.text = null;
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
