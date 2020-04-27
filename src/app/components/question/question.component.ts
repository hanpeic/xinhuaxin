import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Question} from '../../models/question';
import {RequestService} from '../../services/request.service';
import {AuthenticationService} from '../../services/authentication-service.service';
import {ActivatedRoute, Router} from '@angular/router';

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
  constructor(private requestService: RequestService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.lineId = this.activatedRoute.snapshot.queryParamMap.get('lineId');
    this.getQuestion(false, 'next', this.lineId, null, -1,
      null, null, null, null);
    /*this.question = new Question();
    this.question.resOptList = [
        {
          optSort: 11,
          optDesc: '11.是'
        },
        {
          optSort: 12,
          optDesc: '21. 否， 在线平台没有提供试驾预约界面'
        }
      ];
    this.form = this.buildFormGroup(this.question);*/
  }

  buildFormGroup(question: Question) {
    const group: any = {};
    question.resOptList.forEach(answer =>{
      group[answer.optSort.toString()] = new FormControl('');
    });
    return new FormGroup(group);
  }

  getQuestion(isSave, direction, lineId, modelSubjectId, subSort, optResult, isLast, subjectId, situDesc) {
    this.requestService.getQuestion(isSave, direction, lineId, modelSubjectId,
      subSort, optResult, isLast, subjectId, situDesc).subscribe(res => {
      console.log(res);
      if (res.code === 100) {
        this.question = res;
        this.form = this.buildFormGroup(this.question);
      }
      this.loading = false;

    }, error => {
      // this.alertService.error(error);
      console.log(error);
      this.loading = false;
      this.authenticationService.logout();
      window.location.reload();
    });
  }

  onSubmit() {
    let result = '';
    this.loading = true;
    (Object as any).keys(this.form.controls).forEach(key => {
      const value = this.form.get(key).value;
      if (value) {
        result += key + ',';
      }
    });
    if (result.endsWith(',')) {
      result = result.substring(0, result.length - 1);
    }
    this.getQuestion(true, 'next', this.lineId,
      this.question.modelSubjectId, this.question.subSort, result, this.question.last, this.question.subjectid
    , null);

  }

  gotoPrevious() {
    this.getQuestion(false, 'previous', this.lineId,
      this.question.modelSubjectId, this.question.subSort, null, this.question.last, this.question.subjectid
      , null);
  }

  gotoOnSite() {
    this.router.navigate(['onsite'], {queryParams: {lineId: this.lineId}});
  }
}
