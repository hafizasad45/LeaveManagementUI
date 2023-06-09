import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class LMSActivitiesService {

  private baseUrl: string = environment.baseUrl + 'LMS_Activities/';


  constructor(private http: HttpClient, private router: Router) {    
  }

  createLMS_Activity(lms_ActivityObj: any) {
    return this.http.post<any>(`${this.baseUrl}LMS_Activitiy`, lms_ActivityObj);
  }

  updateLMS_Activity(lms_ActivityObj: any) {
    return this.http.put<any>(`${this.baseUrl}LMS_Activitiy`, lms_ActivityObj);
  }

  getLMS_ActivityList() {
    return this.http.get<any>(`${this.baseUrl}LMS_Activitiy`);
  }

  getLMS_ActivityByID(lms_ActivityID : number) {
    return this.http.get<any>(`${this.baseUrl}LMS_Activitiy/${lms_ActivityID}`);
  }

  deleteLMS_Activity(lms_ActivityID : any) {
    return this.http.delete<any>(`${this.baseUrl}LMS_Activitiy/${lms_ActivityID}`);
  }
}
