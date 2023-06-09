import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class InstituteService {

  private baseUrl: string = environment.baseUrl + 'Institute/';


  constructor(private http: HttpClient, private router: Router) {    
  }

  createInstitute(instituteObj: any) {
    return this.http.post<any>(`${this.baseUrl}Institute`, instituteObj);
  }

  updateInstitute(instituteObj: any) {
    return this.http.put<any>(`${this.baseUrl}Institute`, instituteObj);
  }

  getInstituteList() {
    return this.http.get<any>(`${this.baseUrl}Institute`);
  }

  getInstituteByID(instituteID : number) {
    return this.http.get<any>(`${this.baseUrl}Institute/${instituteID}`);
  }

  deleteInstitute(instituteID : any) {
    return this.http.delete<any>(`${this.baseUrl}Institute/${instituteID}`);
    //return this.http.delete<any>(this.baseUrl + "/DeleteInstitute/" + instituteID);
  }
}
