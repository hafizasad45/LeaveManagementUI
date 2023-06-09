import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeTypeService {

  private baseUrl: string = environment.baseUrl + 'EmployeeType/';


  constructor(private http: HttpClient, private router: Router) {    
  }

  createEmployeeType(employeeTypeObj: any) {
    return this.http.post<any>(`${this.baseUrl}EmployeeType`, employeeTypeObj);
  }

  updateEmployeeType(employeeTypeObj: any) {
    return this.http.put<any>(`${this.baseUrl}EmployeeType`, employeeTypeObj);
  }

  getEmployeeTypeList() {
    return this.http.get<any>(`${this.baseUrl}EmployeeType`);
  }

  getEmployeeTypeByID(employeeTypeID : number) {
    return this.http.get<any>(`${this.baseUrl}EmployeeType/${employeeTypeID}`);
  }

  deleteEmployeeType(employeeTypeID : any) {
    return this.http.delete<any>(`${this.baseUrl}EmployeeType/${employeeTypeID}`);
  }
}
