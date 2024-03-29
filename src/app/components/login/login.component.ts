import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { AuthenticationService } from '../../services/authentication-service.service';
import { AlertService} from '../../services/alert.service';

@Component({ templateUrl: 'login.component.html', styleUrls: ['./login.component.scss'] })
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .subscribe(
        data => {
          if (data.code === 100) {
            const user = new User();
            user.username = this.f.username.value;
            user.userType = data.userType;
            this.authenticationService.setUserInfo(user);
            // this.router.navigate([this.returnUrl]);
            // this.router.navigateByUrl(this.returnUrl);
            if (user.userType === undefined || user.userType === 1) {
              this.router.navigate(['home']);
            } else {
              this.router.navigate(['dishome']);
            }
          } else {
            this.alertService.alert(data.msg);
          }
          this.loading = false;
        },
        error => {
          this.alertService.alert('登录失败，请重试');
          this.loading = false;
        });
  }
}
