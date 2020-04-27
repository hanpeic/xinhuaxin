import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  retrieveHome(): Observable<any> {
    const payload = new HttpParams().set('loginName', 'user');
    return this.http.post<any>(`${environment.apiEndpoint}/home`, payload, { withCredentials: true });
  }

  retrievePersion(): Observable<any> {
    const payload = new HttpParams().set('loginName', 'user');
    return this.http.post<any>(`${environment.apiEndpoint}/getPersonInfo`, payload, { withCredentials: true });
  }

  updatePersion(asseNo, mobile, address): Observable<any> {
    const payload = new HttpParams().set('asseNo', asseNo)
      .set('mobile', mobile)
      .set('nowAddr', address);
    return this.http.post<any>(`${environment.apiEndpoint}/savePersonInfo`, payload, { withCredentials: true });
  }

  getQuestion(isSave, direction, lineId, modelSubjectId, subSort, optResult, isLast, subjectId, situDesc): Observable<any> {
    let payload = new HttpParams().set('isSave', isSave)
      .set('direction', direction)
      .set('lineId', lineId)
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
    return this.http.post<any>(`${environment.apiEndpoint}/getNextSubject`, payload, { withCredentials: true });
  }

  retrieveDistributorList(taskId): Observable<any> {
    const payload = new HttpParams().set('taskId', taskId);
    return this.http.post<any>(`${environment.apiEndpoint}/getDistributorList`, payload, { withCredentials: true });
  }

  retrieveDistributor(distrId): Observable<any> {
    const payload = new HttpParams().set('distrId', distrId);
    return this.http.post<any>(`${environment.apiEndpoint}/getDistributor`, payload, { withCredentials: true });
  }

  retrieveTaskDetails(taskId): Observable<any> {
    const payload = new HttpParams().set('taskId', taskId);
    return this.http.post<any>(`${environment.apiEndpoint}/getTaskDetails`, payload, { withCredentials: true });
  }
  retrieveLineList(): Observable<any> {
    const payload = new HttpParams().set('taskId', '');
    return this.http.post<any>(`${environment.apiEndpoint}/getLineList`, payload, { withCredentials: true });
  }
  retrieveLine(lineId): Observable<any> {
    const payload = new HttpParams().set('lineId', lineId);
    return this.http.post<any>(`${environment.apiEndpoint}/getLine`, payload, { withCredentials: true });
  }

  signin(lineId, long, lat): Observable<any> {
    const payload = new HttpParams().set('lineId', lineId)
      .set('longitude', long).set('latitude', lat);
    return this.http.post<any>(`${environment.apiEndpoint}/signin`, payload, { withCredentials: true });
  }

  signout(lineId, long, lat): Observable<any> {
    const payload = new HttpParams().set('lineId', lineId)
      .set('longitude', long).set('latitude', lat);
    return this.http.post<any>(`${environment.apiEndpoint}/signout`, payload, { withCredentials: true });
  }
}
