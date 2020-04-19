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
}
