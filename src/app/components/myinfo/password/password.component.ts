import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertService} from "../../../services/alert.service";
import {RequestService} from "../../../services/request.service";

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {
  passwordForm: FormGroup;
  loading = false;
  submitted = false;
  constructor(public dialogRef: MatDialogRef<PasswordComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {},
              private formBuilder: FormBuilder,
              private alertService: AlertService,
              private requestService: RequestService) { }

  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group({
      oldpass: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  close(confirm): void {
    this.dialogRef.close(confirm);
  }
  get f() { return this.passwordForm.controls; }
  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.passwordForm.invalid) {
      return;
    }
    if (this.f.password.value !== this.f.password2.value) {
      this.alertService.alert('两次输入的新密码必须相同！');
      return;
    }

    this.loading = true;
    this.requestService.changePwd(this.f.oldpass.value, this.f.password.value)
      .subscribe(
        data => {
          if (data.code === 100) {
            this.alertService.alert('密码更新成功！');
          } else {
            this.alertService.alert(data.msg);
          }
          this.loading = false;
          this.dialogRef.close(true);
        },
        error => {
          this.alertService.alert('更新失败，请重试');
          this.loading = false;
          this.dialogRef.close(true);
        });
  }
}
