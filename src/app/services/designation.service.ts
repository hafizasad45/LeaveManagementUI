import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class DesignationService {

  private baseUrl: string = environment.baseUrl + 'Designation/';


  constructor(private http: HttpClient, private router: Router) {    
  }

  createDesignation(designationObj: any) {
    return this.http.post<any>(`${this.baseUrl}CreateDesignation`, designationObj);
  }

  updateDesignation(designationObj: any) {
    return this.http.post<any>(`${this.baseUrl}UpdateDesignation`, designationObj);
  }

  getDesignationList() {
    return this.http.get<any>(`${this.baseUrl}GetDesignationList`);
  }

  getDesignationByID(designationID : number) {
    return this.http.get<any>(`${this.baseUrl}GetDesignationByID/${designationID}`);
  }

  deleteDesignation(designationID : any) {
    return this.http.delete<any>(`${this.baseUrl}DeleteDesignation/${designationID}`);
  }
}
