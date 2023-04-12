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

  getBranchList() {
    return this.http.get<any>(`${this.baseUrl}GetBranchList`);
  }
}
