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
    return this.http.post<any>(`${this.baseUrl}CreateInstitute`, instituteObj);
  }

  updateInstitute(instituteObj: any) {
    return this.http.post<any>(`${this.baseUrl}UpdateInstitute`, instituteObj);
  }

  getInstituteList() {
    return this.http.get<any>(`${this.baseUrl}GetInstituteList`);
  }

  getInstituteByID(instituteID : number) {
    return this.http.get<any>(`${this.baseUrl}GetInstituteByID/${instituteID}`);
  }

  deleteInstitute(instituteID : any) {
    return this.http.delete<any>(`${this.baseUrl}DeleteInstitute/${instituteID}`);
    //return this.http.delete<any>(this.baseUrl + "/DeleteInstitute/" + instituteID);
  }
}
