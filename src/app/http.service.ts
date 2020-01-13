import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { timingSafeEqual } from 'crypto';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  httpOptions = {};

  constructor(private http: HttpClient) {
    this.updateToken();
  }

  updateToken() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
      })
    };
  }

  get(endpoint: string) {
    return this.http.get(endpoint);
  }

  post(endpoint: string, payload) {
    return this.http.post(endpoint, payload, this.httpOptions);
  }

  patch(endpoint: string, payload) {
    return this.http.patch(endpoint, payload, this.httpOptions);
  }

  delete(endpoint: string) {
    return this.http.delete(endpoint, this.httpOptions);
  }
}
