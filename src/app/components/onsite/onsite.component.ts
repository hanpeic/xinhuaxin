import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Subject, Observable} from 'rxjs';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import {MatDialog} from '@angular/material/dialog';
import {SignInComponent} from './sign-in/sign-in.component';
import {RequestService} from '../../services/request.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication-service.service';
import {Route} from '../../models/route';
import {AlertService} from '../../services/alert.service';
import {SubmitComponent} from './submit/submit.component';
// declare const $: any;
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
  operatingSystem: string;

  // webcam snapshot trigger
  // private trigger: Subject<void> = new Subject<void>();
  constructor(private matDialog: MatDialog, private requestService: RequestService,
              private activatedRoute: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private changeDetector: ChangeDetectorRef,
              private alertService: AlertService,
              private router: Router) { }

  ngOnInit(): void {
    this.operatingSystem = this.getSystem();
    this.lineId = this.activatedRoute.snapshot.queryParamMap.get('lineId');
    if (this.lineId) {
      this.fetchLine(this.lineId);
    }
  }
  getSystem() {
    const userAgent = window.navigator.userAgent;
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return 'iOS';
    }
    if (/android/i.test(userAgent)) {
      return 'Android';
    }
    return 'unknown';
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
    const uploadImage = document.getElementById('uploadImage') as HTMLInputElement;
    const uploadImageDel = document.getElementById('uploadImage__del') as HTMLInputElement;
    const imageCount = uploadImage.value.split(',').filter(String).length;
    if (imageCount < 1) {
      this.alertService.alert('请上传1张图片后再签到');
      return;
    }
    this.loading = true;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        this.requestService.signin(this.lineId, longitude, latitude, uploadImage.value, uploadImageDel.value).subscribe(res => {
          console.log(res);
          this.loading = false;
          if (res.code === 100) {
            this.alertService.alert('签到成功！');
            const elements = document.getElementsByClassName('file-panel');
            while (elements.length > 0){
              elements[0].parentNode.removeChild(elements[0]);
            }
            this.fetchLine(this.lineId);
          } else {
            this.alertService.alert('签到失败！请重试。错误信息：' + res.msg);
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
        this.alertService.alert('签到失败！请重试并允许程序获取当前位置');
        console.log('error:' + error.code + ',message:' + error.message);
      });
    } else {
      this.loading = false;
      console.log('No support for geolocation');
      this.alertService.alert('签到失败！请重试并允许程序获取当前位置');
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
            this.alertService.alert('签出成功！');
            this.fetchLine(this.lineId);
          } else {
            this.alertService.alert('签出失败！请重试。错误信息：' + res.msg);
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
        this.alertService.alert('签出失败！请重试并允许程序获取当前位置');
        console.log('error:' + error.code + ',message:' + error.message);
      });
    } else {
      this.loading = false;
      console.log('No support for geolocation');
      this.alertService.alert('签出失败！请重试并允许程序获取当前位置');
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
    this.router.navigate(['question'], {queryParams: {lineId: this.lineId, isOrder: 'true'}});
  }

  beginTestOne() {
    this.router.navigate(['choose-question'], {queryParams: {lineId: this.lineId}});
  }

  fetchLine(lineId) {
    this.requestService.retrieveLine(lineId).subscribe(res => {
      console.log(res);
      if (res.code === 100) {
        this.route = res;
      } else {
        this.router.navigate(['error'], {queryParams: {message: res.msg}});
      }

    }, error => {
      // this.alertService.error(error);
      console.log(error);
      this.authenticationService.logout();
      window.location.reload();
    });
  }
  gotoRoute() {
    if (this.authenticationService.isDis()) {
      this.router.navigate(['dishome']);
    } else {
      this.router.navigate(['routes']);
    }
  }
  submitLine() {
    const modalRef = this.matDialog.open(SubmitComponent, {
      minWidth: '250px'
    });
    modalRef.afterClosed().subscribe(result => {
      if (result) {
        this.requestService.submitLine(this.lineId).subscribe(res => {
          console.log(res);
          if (res.code === 100) {
            this.route = res;
            this.alertService.alert('提交问卷成功！');
            this.fetchLine(this.lineId);
          } else {
            this.alertService.alert('提交失败！请重试。错误信息：' + res.msg);
          }

        }, error => {
          // this.alertService.error(error);
          console.log(error);
          this.authenticationService.logout();
          window.location.reload();
        });
      }
    });
  }
}
