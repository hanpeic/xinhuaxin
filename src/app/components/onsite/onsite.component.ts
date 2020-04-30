import { Component, OnInit } from '@angular/core';
import {Subject, Observable} from 'rxjs';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import {MatDialog} from '@angular/material/dialog';
import {SignInComponent} from './sign-in/sign-in.component';
import {RequestService} from '../../services/request.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication-service.service';
import {Route} from '../../models/route';
import {AlertService} from '../../services/alert.service';
@Component({
  selector: 'app-onsite',
  templateUrl: './onsite.component.html',
  styleUrls: ['./onsite.component.scss']
})
export class OnsiteComponent implements OnInit {
  public errors: WebcamInitError[] = [];

  // latest snapshot
  public webcamImage: WebcamImage = null;
  lineId: string;
  route: Route;
  loading = false;

  // webcam snapshot trigger
  // private trigger: Subject<void> = new Subject<void>();
  constructor(private matDialog: MatDialog, private requestService: RequestService,
              private activatedRoute: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private alertService: AlertService,
              private router: Router) { }

  ngOnInit(): void {
    this.lineId = this.activatedRoute.snapshot.queryParamMap.get('lineId');
    if (this.lineId) {
      this.fetchLine(this.lineId);
    }
  }

  /* beginSignin(): void {
    const modalRef = this.matDialog.open(SignInComponent, {
      data: {}
    });
    modalRef.afterClosed().subscribe(result => {
      if (result) {
        this.webcamImage = result;
      }
    });
  } */
  beginSignin() {
    this.alertService.clear();
    this.loading = true;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        this.requestService.signin(this.lineId, longitude, latitude).subscribe(res => {
          console.log(res);
          this.loading = false;
          if (res.code === 100) {
            this.alertService.success('签到成功！');
          }

        }, error => {
          this.loading = false;
          // this.alertService.error(error);
          console.log(error);
          this.authenticationService.logout();
          window.location.reload();
        });
      }, (error) => {
        this.loading = false;
        this.alertService.error('签到失败！请重试并允许程序获取当前位置');
        console.log('error:' + error.code + ',message:' + error.message);
      });
    } else {
      this.loading = false;
      console.log('No support for geolocation');
      this.alertService.error('签到失败！请重试并允许程序获取当前位置');
    }
  }
  beginSignout() {
    this.alertService.clear();
    this.loading = true;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        this.requestService.signout(this.lineId, longitude, latitude).subscribe(res => {
          console.log(res);
          this.loading = false;
          if (res.code === 100) {
            this.alertService.success('签出成功！');
          }

        }, error => {
          // this.alertService.error(error);
          console.log(error);
          this.loading = false;
          this.authenticationService.logout();
          window.location.reload();
        });
      }, (error) => {
        this.loading = false;
        this.alertService.error('签出失败！请重试并允许程序获取当前位置');
        console.log('error:' + error.code + ',message:' + error.message);
      });
    } else {
      this.loading = false;
      console.log('No support for geolocation');
      this.alertService.error('签出失败！请重试并允许程序获取当前位置');
    }
  }
  beginSignin2() {
    console.log('begin signin');
    if (navigator.geolocation) {
      console.log('in geo');
      navigator.geolocation.getCurrentPosition((position) => {
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        console.log('lat:' + latitude + ',long:' + longitude);
      }, (error) => {
        console.log('error:' + error.code + ',message:' + error.message);
      });
    } else {
      console.log('No support for geolocation');
    }
  }
  beginTest() {
    this.router.navigate(['question'], {queryParams: {lineId: this.lineId}});
  }

  fetchLine(lineId) {
    this.requestService.retrieveLine(lineId).subscribe(res => {
      console.log(res);
      if (res.code === 100) {
        this.route = res;
      }

    }, error => {
      // this.alertService.error(error);
      console.log(error);
      this.authenticationService.logout();
      window.location.reload();
    });
  }
  gotoRoute() {
    this.router.navigate(['routes']);
  }
}
