import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {RequestService} from '../../services/request.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication-service.service';
import {Route} from '../../models/route';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from "../../services/alert.service";

@Component({
  selector: 'app-choose-question',
  templateUrl: './choose-question.component.html',
  styleUrls: ['./choose-question.component.scss']
})
export class ChooseQuestionComponent implements OnInit {
  lineId: string;
  route: Route;
  moduleList: [];
  titleList: [];
  selectForm: FormGroup;
  loading = false;
  constructor(private requestService: RequestService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private alertService: AlertService,
              private formBuilder: FormBuilder,
              private changeDetector: ChangeDetectorRef,
              private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.moduleList = [];
    this.titleList = [];
    this.selectForm = this.formBuilder.group({
      moduleCode: ['', Validators.required],
      titleCode: ['', Validators.required]
    });
    this.lineId = this.activatedRoute.snapshot.queryParamMap.get('lineId');
    if (this.lineId) {
      this.fetchLine(this.lineId);
    }
    this.onChanges();
  }

  onChanges() {
    this.selectForm.get('moduleCode').valueChanges.subscribe(code => {
      this.selectForm.patchValue({
        titleCode: null
      });
      this.titleList = [];
      this.changeDetector.detectChanges();
      this.fetchTitle(code);
    });
  }

  fetchTitle(code) {
    this.requestService.getTitleList(this.route.projId, this.lineId, code).subscribe(res => {
      console.log(res);
      if (res.code === 100) {
        this.titleList = res.titleList;
      } else {
        this.alertService.alert('获取指标失败！错误信息：' + res.msg);
      }

    }, error => {
      // this.alertService.error(error);
      console.log(error);
      const errMessage = `获取指标失败！错误码: ${error.status}, 内容: ${error.error && error.error.msg ? error.error.msg : error.statusText }`;
      this.alertService.alert(errMessage);
    });
  }

  fetchLine(lineId) {
    this.requestService.retrieveLine(lineId).subscribe(res => {
      console.log(res);
      if (res.code === 100) {
        this.route = res;
        this.getModuleList();

      } else {
        this.router.navigate(['error'], {queryParams: {message: res.msg}});
      }

    }, error => {
      // this.alertService.error(error);
      console.log(error);
      const errMessage = `错误码: ${error.status}, 内容: ${error.error && error.error.msg ? error.error.msg : error.statusText }`;
      this.router.navigate(['error'], {queryParams: {message: errMessage}});
    });
  }

  getModuleList() {
    this.requestService.getModuleList(this.route.projId, this.lineId).subscribe(res => {
      console.log(res);
      if (res.code === 100) {
        this.moduleList = res.moduleList;
      } else {
        this.alertService.alert('获取模块失败！错误信息：' + res.msg);
      }

    }, error => {
      // this.alertService.error(error);
      console.log(error);
      const errMessage = `获取模块失败！错误码: ${error.status}, 内容: ${error.error && error.error.msg ? error.error.msg : error.statusText }`;
      this.alertService.alert(errMessage);
    });
  }
  gotoRoute() {
    this.router.navigate(['onsite'], {queryParams: {lineId: this.lineId}});
  }
  onSubmit() {
    this.router.navigate(['question'], {queryParams: {lineId: this.lineId,
        moduleCode: this.selectForm.controls.moduleCode.value, titleCode: this.selectForm.controls.titleCode.value,
        isOrder: 'false'}});
  }
}
