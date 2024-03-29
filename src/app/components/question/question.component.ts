import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Question} from '../../models/question';
import {RequestService} from '../../services/request.service';
import {AuthenticationService} from '../../services/authentication-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import { NgZone, ViewChild} from '@angular/core';
import {take} from 'rxjs/operators';
import {AlertService} from '../../services/alert.service';
import {FileComponent} from './file/file.component';
import {Route} from '../../models/route';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  form: FormGroup;
  question: Question;
  lineId: string;
  loading = false;
  disableArray = {};
  enableArrayFromServer = {};
  ruleHash = {};
  situDesc = '';
  showFile = true;
  route: Route;
  // new parameters for get one question mode
  moduleCode: string;
  titleCode: string;
  isDis: boolean;
  isOrder = true;
  @ViewChild(FileComponent) childFile: FileComponent;
  constructor(private requestService: RequestService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private _ngZone: NgZone,
              private changeDetector: ChangeDetectorRef,
              private alertService: AlertService,
              private authenticationService: AuthenticationService) { }
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  ngOnInit(): void {
    this.lineId = this.activatedRoute.snapshot.queryParamMap.get('lineId');
    this.moduleCode = this.activatedRoute.snapshot.queryParamMap.get('moduleCode');
    this.titleCode = this.activatedRoute.snapshot.queryParamMap.get('titleCode');
    this.isDis = this.authenticationService.isDis();
    this.isOrder = this.activatedRoute.snapshot.queryParamMap.get('isOrder') === 'true';
    if (this.lineId) {
      this.fetchLine(this.lineId);
    }
  }

  buildFormGroup(question: Question) {
    const group: any = {};
    this.disableArray = {};
    question.resOptList.forEach(answer => {
      group[answer.optSort.toString()] = new FormControl('');
      this.disableArray[answer.optSort.toString()] = false;
      this.enableArrayFromServer[answer.optSort.toString()] = answer.isAllowSelect;
    });
    return new FormGroup(group);
  }
  updateAnswer(optResult) {
    optResult.split(',').forEach(result => {
      this.form.get(result).patchValue(true);
    });
  }
  updateDisable() {
    //if (this.form.get('11') && this.form.get('11').value) {
      // this.multiChangeDisable('11', true);
    //} else {
      let ticked = false;
      (Object as any).keys(this.form.controls).forEach(key => {
        if (key !== '11') {
          const value = this.form.get(key).value;
          if (value) {
            ticked = true;
            const rules = this.ruleHash[key];
            if (rules) {
              rules.forEach(rule => {
                this.disableArray[rule] = true;
              });
            }
          }
        }
      });
      if (ticked) {
        // this.disableArray['11'] = true;
      } else {
        this.multiChangeDisable(null, false);
      }
    //}
  }

  updateEnable(key) {
    if (key === '11') {
      //this.multiChangeDisable(null, false);
    } else {
      let ticked = false;
      const rules = this.ruleHash[key];
      if (rules) {
        rules.forEach(rule => {
          let isDisable = false;
          this.ruleHash[rule].forEach(item => {
            if (this.form.get(item).value) {
              isDisable = true;
            }
          });
          if (!isDisable) {
            this.disableArray[rule] = false;
          }
        });
      }
      (Object as any).keys(this.form.controls).forEach(key => {
        if (key !== '11') {
          const value = this.form.get(key).value;
          if (value) {
            ticked = true;
          }
        }
      });
      if (!ticked) {
        this.disableArray['11'] = false;
      }
    }
  }

  multiChangeDisable(except, value) {
    Object.keys(this.disableArray).forEach(key => {
      if (key !== except) {
        this.disableArray[key] = value;
      }
    });
  }

  buildRule(ruleStr) {
    const rules = ruleStr.split(',');
    rules.forEach(rule => {
      rule.split(':').forEach(singleRule => {
        this.ruleHash[singleRule] = [];
        rules.forEach(rule2 => {
          if (rule2.indexOf(singleRule) < 0) {
            this.ruleHash[singleRule] = this.ruleHash[singleRule].concat(rule2.split(':'));
          }
        });
      });
    });
  }

  checkAnswer(key, event) {
    console.log(key + ':' + this.form.get(key).value);
    if (this.form.get(key).value) {
      this.updateDisable();
    } else {
      this.updateEnable(key);
    }
  }
  saveQuestion(lineId, subjectId, modelSubjectId, optResult, situDesc, uploadFile, uploadFileDel, uploadImage, uploadImageDel) {
    this.requestService.saveSubject(lineId, subjectId, modelSubjectId, optResult, situDesc, uploadFile,
      uploadFileDel, uploadImage, uploadImageDel).subscribe(res => {
      console.log(res);
      if (res.code === 100) {
        this.alertService.alert('提交成功! 返回选题页面');
        this.router.navigate(['choose-question'], {queryParams: {lineId: this.lineId}});
      } else {
        this.alertService.alert('提交失败，请重试!');
        this.router.navigate(['error'], {queryParams: {message: res.msg}});
      }
      this.loading = false;

    }, error => {
      // this.alertService.error(error);
      console.log(error);
      this.loading = false;
      this.alertService.alert('提交失败，请重试!');
      // this.authenticationService.logout();
      // window.location.reload();
    });
  }
  getQuestion(isSave, direction, lineId, modelSubjectId, subSort, optResult, isLast,
              subjectId, situDesc, uploadFile, uploadFileDel, uploadImage, uploadImageDel, isOrder) {
    this.requestService.getQuestion(isSave, direction, lineId, modelSubjectId,
      subSort, optResult, isLast, subjectId, situDesc, uploadFile, uploadFileDel, uploadImage, uploadImageDel, isOrder).subscribe(res => {
      console.log(res);
      if (res.code === 100) {
        this.showFile = false;
        this.changeDetector.detectChanges();
        this.question = res;
        this.showFile = true;
        this.form = this.buildFormGroup(this.question);
        if (this.question.optRelaFa) {
          this.buildRule(this.question.optRelaFa);
        } else {
          this.ruleHash = {};
        }
        if (this.question.optResult) {
          this.updateAnswer(this.question.optResult);
          this.updateDisable();
        }
        if (this.question.situDesc) {
          this.situDesc = this.question.situDesc;
        } else {
          this.situDesc = '';
        }
        // this.childFile.ngOnInit();
      } else {
        this.router.navigate(['error'], {queryParams: {message: res.msg}});
      }
      this.loading = false;

    }, error => {
      // this.alertService.error(error);
      console.log(error);
      this.loading = false;
      const errMessage = `获取题目出错，lineId ${lineId} modelSubjectId ${modelSubjectId} subjectId ${subjectId}, 错误码: ${error.status}, 内容: ${error.error && error.error.msg ? error.error.msg : error.statusText }`;
      this.router.navigate(['error'], {queryParams: {message: errMessage}});
    });
  }

  onSubmit() {
    let result = '';
    this.alertService.clear();
    (Object as any).keys(this.form.controls).forEach(key => {
      const value = this.form.get(key).value;
      if (value) {
        result += key + ',';
      }
    });
    if (result.endsWith(',')) {
      result = result.substring(0, result.length - 1);
    }
    if (result.length === 0) {
      this.alertService.alert('请至少选择一项!');
      return;
    }
    if (this.form.get('89') && this.form.get('89').value) {
      if (this.situDesc.length === 0) {
        this.alertService.alert('选择89请必须在备注添加内容');
        return;
      }
    }
    const uploadFile = document.getElementById('uploadFile') as HTMLInputElement;
    const uploadFileDel = document.getElementById('uploadFile__del') as HTMLInputElement;
    const uploadImage = document.getElementById('uploadImage') as HTMLInputElement;
    const uploadImageDel = document.getElementById('uploadImage__del') as HTMLInputElement;
    if (this.question.picCount && this.question.picCount > 0) {
      const imageCount = uploadImage.value.split(',').filter(String).length;
      if (this.question.picCount > imageCount) {
        this.alertService.alert('请上传' + this.question.picCount + '张图片后再提交');
        return;
      }
    }
    if (this.question.vidCount && this.question.vidCount > 0) {
      const imageCount = uploadFile.value.split(',').filter(String).length;
      if (this.question.vidCount > imageCount) {
        this.alertService.alert('请上传' + this.question.vidCount + '个视频后再提交');
        return;
      }
    }
    this.loading = true;
    /* if (this.titleCode && this.moduleCode) {
      this.saveQuestion(this.lineId, this.question.subjectid, this.question.modelSubjectId, result, this.situDesc,
        uploadFile.value, uploadFileDel.value, uploadImage.value, uploadImageDel.value);
    } else { */
      this.getQuestion(true, 'next', this.lineId,
        this.question.modelSubjectId, this.question.subSort, result, this.question.last, this.question.subjectid
        , this.situDesc, uploadFile.value, uploadFileDel.value, uploadImage.value, uploadImageDel.value, this.isOrder);
    // }
  }

  gotoNext() {
    this.loading = true;
    this.alertService.clear();
    this.getQuestion(false, 'next', this.lineId,
      this.question.modelSubjectId, this.question.subSort, null, this.question.last, this.question.subjectid
      , null, null, null, null, null, this.isOrder);
  }

  gotoPrevious() {
    this.loading = true;
    this.alertService.clear();
    this.getQuestion(false, 'previous', this.lineId,
      this.question.modelSubjectId, this.question.subSort, null, this.question.last, this.question.subjectid
      , null, null, null, null, null, this.isOrder);
  }

  gotoOnSite() {
    if (this.titleCode && this.moduleCode) {
      this.router.navigate(['choose-question'], {queryParams: {lineId: this.lineId}});
    } else {
      this.router.navigate(['onsite'], {queryParams: {lineId: this.lineId}});
    }
  }

  gotoOnSite2() {
    this.router.navigate(['onsite'], {queryParams: {lineId: this.lineId}});
  }

  fetchLine(lineId) {
    this.requestService.retrieveLine(lineId).subscribe(res => {
      console.log(res);
      if (res.code === 100) {
        this.route = res;
        if (this.titleCode && this.moduleCode) {
          this.getOneQuestion(this.lineId, this.route.projId, this.moduleCode, this.titleCode);
        }
        else {
          this.getQuestion(false, 'next', this.lineId, null, -1,
            null, null, null, null, null, null, null, null, this.isOrder);
        }
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

  getOneQuestion(lineId, projId, moduleCode, titleCode) {
    this.requestService.getSubject(projId, lineId, moduleCode, titleCode).subscribe(res => {
      console.log(res);
      if (res.code === 100) {
        this.showFile = false;
        this.changeDetector.detectChanges();
        this.question = res;
        this.showFile = true;
        this.form = this.buildFormGroup(this.question);
        if (this.question.optRelaFa) {
          this.buildRule(this.question.optRelaFa);
        } else {
          this.ruleHash = {};
        }
        if (this.question.optResult) {
          this.updateAnswer(this.question.optResult);
          this.updateDisable();
        }
        if (this.question.situDesc) {
          this.situDesc = this.question.situDesc;
        } else {
          this.situDesc = '';
        }
        // this.childFile.ngOnInit();
      } else {
        this.alertService.alert(res.msg);
        this.router.navigate(['choose-question'], {queryParams: {lineId: this.lineId}});
      }
      this.loading = false;

    }, error => {
      // this.alertService.error(error);
      console.log(error);
      this.loading = false;
      const errMessage = `错误码: ${error.status}, 内容: ${error.error && error.error.msg ? error.error.msg : error.statusText }`;
      this.router.navigate(['error'], {queryParams: {message: errMessage}});
    });
  }
}
