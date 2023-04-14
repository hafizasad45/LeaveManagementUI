import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private baseUrl: string = environment.baseUrl + 'Department/';


  constructor(private http: HttpClient, private router: Router) {    
  }

  createDepartment(departmentObj: any) {
    return this.http.post<any>(`${this.baseUrl}CreateDepartment`, departmentObj);
  }

  updateDepartment(departmentObj: any) {
    return this.http.post<any>(`${this.baseUrl}UpdateDepartment`, departmentObj);
  }

  getDepartmentList() {
    return this.http.get<any>(`${this.baseUrl}GetDepartmentList`);
  }

  getDepartmentByID(departmentID : number) {
    return this.http.get<any>(`${this.baseUrl}GetDepartmentByID/${departmentID}`);
  }

  deleteDepartment(departmentID : any) {
    return this.http.delete<any>(`${this.baseUrl}DeleteDepartment/${departmentID}`);
  }
}
