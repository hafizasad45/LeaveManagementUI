import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environment/environment';
import { ModelEmployee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl: string = environment.baseUrl + 'Employee/';


  constructor(private http: HttpClient, private router: Router) {    
  }

  createEmployee(employeeObj: ModelEmployee) {
    return this.http.post<any>(`${this.baseUrl}Employee`, employeeObj);
  }

  updateEmployee(employeeObj: any) {
    return this.http.put<any>(`${this.baseUrl}Employee`, employeeObj);
  }

  getEmployeeList() {
    return this.http.get<any>(`${this.baseUrl}Employee`);
  }

  getEmployeeByID(employeeID : number) {
    return this.http.get<any>(`${this.baseUrl}Employee/${employeeID}`);
  }

  deleteEmployee(employeeID : any) {
    return this.http.delete<any>(`${this.baseUrl}Employee/${employeeID}`);
  }
}
