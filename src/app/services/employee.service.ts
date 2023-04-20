import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl: string = environment.baseUrl + 'Employee/';


  constructor(private http: HttpClient, private router: Router) {    
  }

  createEmployee(employeeObj: any) {
    return this.http.post<any>(`${this.baseUrl}CreateEmployee`, employeeObj);
  }

  updateEmployee(employeeObj: any) {
    return this.http.post<any>(`${this.baseUrl}UpdateEmployee`, employeeObj);
  }

  getEmployeeList() {
    return this.http.get<any>(`${this.baseUrl}GetEmployeeList`);
  }

  getEmployeeByID(employeeID : number) {
    return this.http.get<any>(`${this.baseUrl}GetEmployeeByID/${employeeID}`);
  }

  deleteEmployee(employeeID : any) {
    return this.http.delete<any>(`${this.baseUrl}DeleteEmployee/${employeeID}`);
  }
}
