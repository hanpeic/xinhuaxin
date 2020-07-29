import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../../services/alert.service';
import {AuthenticationService} from '../../services/authentication-service.service';
import {RequestService} from '../../services/request.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {PasswordComponent} from './password/password.component';

@Component({
  selector: 'app-myinfo',
  templateUrl: './myinfo.component.html',
  styleUrls: ['./myinfo.component.scss']
})
export class MyinfoComponent implements OnInit {
  personForm: FormGroup;
  asseNo: string;
  name: string;
  loading = false;
  submitted = false;
  isDis: boolean;
  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private router: Router,
              private alertService: AlertService,
              private matDialog: MatDialog,
              private requestService: RequestService) { }

  ngOnInit(): void {
    this.isDis = this.authenticationService.isDis();
    if (!this.isDis) {
      this.getUser();
    }
  }
  get f() { return this.personForm.controls; }

  getUser() {
    this.requestService.retrievePersion().subscribe(res => {
      console.log(res);
      if (res.code === 100) {
        this.asseNo = res.asseNo;
        this.name = res.name;
        this.personForm = this.formBuilder.group({
          phone: this.formBuilder.control( res.mobile ? res.mobile : '', Validators.required),
          address: this.formBuilder.control(res.nowAddr ? res.nowAddr : '', Validators.required)
        });
      } else {
        this.alertService.alert(res.msg);
        // this.router.navigate(['error'], {queryParams: {message: res.msg}});
      }

    }, error => {
      // this.alertService.error(error);
      console.log(error);
      this.authenticationService.logout();
      window.location.reload();
    });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.personForm.invalid) {
      return;
    }

    this.loading = true;
    this.requestService.updatePersion(this.asseNo, this.f.phone.value, this.f.address.value)
      .subscribe(
        data => {
          if (data.code === 100) {
            this.alertService.success('更新成功');
          } else {
            this.alertService.error(data.msg);
          }
          this.loading = false;
        },
        error => {
          this.alertService.error('更新失败，请重试');
          this.loading = false;
          this.authenticationService.logout();
          window.location.reload();
        });
  }

  updatePassword() {
    const modalRef = this.matDialog.open(PasswordComponent, {
      minWidth: '250px'
    });
  }
}
