import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class LmsWeekendService {

  private baseUrl: string = environment.baseUrl + 'LMS_Weekend/';


  constructor(private http: HttpClient, private router: Router) {    
  }

  getLMS_WeekendList() {
    return this.http.get<any>(`${this.baseUrl}LMS_Weekend`);
  }

  createLMS_Weekend(lms_WeekendObj: any) {
    console.log(lms_WeekendObj);
    return this.http.post<any>(`${this.baseUrl}LMS_Weekend`, lms_WeekendObj);
  }
}
