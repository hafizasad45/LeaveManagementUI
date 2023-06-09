import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  private baseUrl: string = environment.baseUrl + 'Branch/';


  constructor(private http: HttpClient, private router: Router) {    
  }

  createBranch(branchObj: any) {
    return this.http.post<any>(`${this.baseUrl}Branch`, branchObj);
  }

  updateBranch(branchObj: any) {
    return this.http.put<any>(`${this.baseUrl}Branch`, branchObj);
  }

  getBranchList() {
    return this.http.get<any>(`${this.baseUrl}Branch`);
  }

  getBranchByID(branchID : number) {
    return this.http.get<any>(`${this.baseUrl}Branch/${branchID}`);
  }

  deleteBranch(branchID : any) {
    return this.http.delete<any>(`${this.baseUrl}Branch/${branchID}`);
  }
}
