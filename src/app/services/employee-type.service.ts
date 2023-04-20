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
    return this.http.post<any>(`${this.baseUrl}CreateEmployeeType`, employeeTypeObj);
  }

  updateEmployeeType(employeeTypeObj: any) {
    return this.http.post<any>(`${this.baseUrl}UpdateEmployeeType`, employeeTypeObj);
  }

  getEmployeeTypeList() {
    return this.http.get<any>(`${this.baseUrl}GetEmployeeTypeList`);
  }

  getEmployeeTypeByID(employeeTypeID : number) {
    return this.http.get<any>(`${this.baseUrl}GetEmployeeTypeByID/${employeeTypeID}`);
  }

  deleteEmployeeType(employeeTypeID : any) {
    return this.http.delete<any>(`${this.baseUrl}DeleteEmployeeType/${employeeTypeID}`);
  }
}
