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
    return this.http.post<any>(`${this.baseUrl}CreateBranch`, branchObj);
  }

  updateBranch(branchObj: any) {
    return this.http.post<any>(`${this.baseUrl}UpdateBranch`, branchObj);
  }

  getBranchList() {
    return this.http.get<any>(`${this.baseUrl}GetBranchList`);
  }

  getBranchByID(branchID : number) {
    return this.http.get<any>(`${this.baseUrl}GetBranchByID/${branchID}`);
  }

  deleteBranch(branchID : any) {
    return this.http.delete<any>(`${this.baseUrl}DeleteBranch/${branchID}`);
  }
}
