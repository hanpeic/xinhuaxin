import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {StateService} from './state.service';
@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient, private stateService: StateService) { }

  retrieveHome(): Observable<any> {
    const payload = new HttpParams().set('loginName', 'user');
    return this.http.post<any>(`${this.stateService.apiEndpoint}/home`, payload, { withCredentials: true });
  }

  retrieveDishome(): Observable<any> {
    const payload = new HttpParams().set('loginName', 'user');
    return this.http.post<any>(`${this.stateService.apiEndpoint}/disHome`, payload, { withCredentials: true });
  }

  retrievePersion(): Observable<any> {
    const payload = new HttpParams().set('loginName', 'user');
    return this.http.post<any>(`${this.stateService.apiEndpoint}/getPersonInfo`, payload, { withCredentials: true });
  }

  updatePersion(asseNo, mobile, address): Observable<any> {
    const payload = new HttpParams().set('asseNo', asseNo)
      .set('mobile', mobile)
      .set('nowAddr', address);
    return this.http.post<any>(`${this.stateService.apiEndpoint}/savePersonInfo`, payload, { withCredentials: true });
  }

  getQuestion(isSave, direction, lineId, modelSubjectId, subSort, optResult, isLast,
              subjectId, situDesc, uploadFile, uploadFileDel, uploadImage, uploadImageDel, isOrder): Observable<any> {
    let payload = new HttpParams().set('isSave', isSave)
      .set('direction', direction)
      .set('lineId', lineId)
      .set('isOrder', isOrder)
      .set('subSort', subSort);
    if (modelSubjectId) {
      payload = payload.set('modelSubjectId', modelSubjectId);
    }
    if (optResult) {
      payload = payload.set('optResult', optResult);
    }
    if (isLast !== null) {
      payload = payload.set('isLast', isLast);
    }
    if (subjectId) {
      payload = payload.set('subjectId', subjectId);
    }
    if (situDesc) {
      payload = payload.set('situDesc', situDesc);
    }
    if (uploadFile) {
      payload = payload.set('projLineSuvSub_file', uploadFile);
    }
    if (uploadFileDel) {
      payload = payload.set('projLineSuvSub_file__del', uploadFileDel);
    }
    if (uploadImage) {
      payload = payload.set('projLineSuvSub_image', uploadImage);
    }
    if (uploadImageDel) {
      payload = payload.set('projLineSuvSub_image__del', uploadImageDel);
    }
    return this.http.post<any>(`${this.stateService.apiEndpoint}/getNextSubject`, payload, { withCredentials: true });
  }
  saveSubject(lineId, subjectId, modelSubjectId, optResult, situDesc, uploadFile, uploadFileDel, uploadImage, uploadImageDel) {
    let payload = new HttpParams().set('lineId', lineId);
    if (modelSubjectId) {
      payload = payload.set('modelSubjectId', modelSubjectId);
    }
    if (optResult) {
      payload = payload.set('optResult', optResult);
    }
    if (subjectId) {
      payload = payload.set('subjectId', subjectId);
    }
    if (situDesc) {
      payload = payload.set('situDesc', situDesc);
    }
    if (uploadFile) {
      payload = payload.set('projLineSuvSub_file', uploadFile);
    }
    if (uploadFileDel) {
      payload = payload.set('projLineSuvSub_file__del', uploadFileDel);
    }
    if (uploadImage) {
      payload = payload.set('projLineSuvSub_image', uploadImage);
    }
    if (uploadImageDel) {
      payload = payload.set('projLineSuvSub_image__del', uploadImageDel);
    }
    return this.http.post<any>(`${this.stateService.apiEndpoint}/saveSubject`, payload, { withCredentials: true });
  }

  retrieveDistributorList(taskId): Observable<any> {
    const payload = new HttpParams().set('taskId', taskId);
    return this.http.post<any>(`${this.stateService.apiEndpoint}/getDistributorList`, payload, { withCredentials: true });
  }

  retrieveDistributor(distrId): Observable<any> {
    const payload = new HttpParams().set('distrId', distrId);
    return this.http.post<any>(`${this.stateService.apiEndpoint}/getDistributor`, payload, { withCredentials: true });
  }

  retrieveTaskDetails(taskId): Observable<any> {
    const payload = new HttpParams().set('taskId', taskId);
    return this.http.post<any>(`${this.stateService.apiEndpoint}/getTaskDetails`, payload, { withCredentials: true });
  }
  retrieveLineList(): Observable<any> {
    const payload = new HttpParams().set('taskId', '');
    return this.http.post<any>(`${this.stateService.apiEndpoint}/getLineList`, payload, { withCredentials: true });
  }
  retrieveLine(lineId): Observable<any> {
    const payload = new HttpParams().set('lineId', lineId);
    return this.http.post<any>(`${this.stateService.apiEndpoint}/getLine`, payload, { withCredentials: true });
  }

  signin(lineId, long, lat, uploadImage, uploadImageDel): Observable<any> {
    let payload = new HttpParams().set('lineId', lineId)
      .set('longitude', long).set('latitude', lat);
    if (uploadImage) {
      payload = payload.set('signin_image', uploadImage);
    }
    if (uploadImageDel) {
      payload = payload.set('signin_image__del', uploadImageDel);
    }
    return this.http.post<any>(`${this.stateService.apiEndpoint}/signin`, payload, { withCredentials: true });
  }

  signout(lineId, long, lat): Observable<any> {
    const payload = new HttpParams().set('lineId', lineId)
      .set('longitude', long).set('latitude', lat);
    return this.http.post<any>(`${this.stateService.apiEndpoint}/signout`, payload, { withCredentials: true });
  }
  submitLine(lineId): Observable<any> {
    const payload = new HttpParams().set('lineId', lineId);
    return this.http.post<any>(`${this.stateService.apiEndpoint}/submitLine`, payload, { withCredentials: true });
  }
  getModuleList(projId, lineId) {
    const payload = new HttpParams().set('lineId', lineId)
      .set('projId', projId);
    return this.http.post<any>(`${this.stateService.apiEndpoint}/getModuleList`, payload, { withCredentials: true });
  }
  getTitleList(projId, lineId, moduleCode) {
    const payload = new HttpParams().set('lineId', lineId)
      .set('projId', projId).set('moduleCode', moduleCode);
    return this.http.post<any>(`${this.stateService.apiEndpoint}/getTitleList`, payload, { withCredentials: true });
  }
  getSubject(projId, lineId, moduleCode, titleCode) {
    const payload = new HttpParams().set('lineId', lineId)
      .set('projId', projId).set('moduleCode', moduleCode).set('titleCode', titleCode);
    return this.http.post<any>(`${this.stateService.apiEndpoint}/getSubject`, payload, { withCredentials: true });
  }
  changePwd(oldPassword, newPassword) {
    const payload = new HttpParams().set('oldPassword', oldPassword)
      .set('newPassword', newPassword);
    return this.http.post<any>(`${this.stateService.apiEndpoint}/changepwd`, payload, { withCredentials: true });
  }
}
