import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observer } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private baseURL = "http://localhost:3000/";

  constructor(private http: Http) { }


  getNearByCabs(req): Promise<any> {
    return this.http.get(this.baseURL + 'getListOfCarsNearBy', { params: req }).toPromise().then((res) => {
      console.log(res.json());
      return res.json();
    })
  }
  bookCab(req): Promise<any> {
    return this.http.post(this.baseURL + 'bookCab', req).toPromise().then((res) => {
      console.log(res.json());
      return res.json();
    })
  }
  endRide(req): Promise<any> {
    return this.http.post(this.baseURL + 'endRide', req).toPromise().then((res) => {
      console.log(res.json());
      return res.json();
    })
  }
}
