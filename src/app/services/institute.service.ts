import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class InstituteService {

  private baseUrl: string = environment.baseUrl + 'User/';


  constructor(private http: HttpClient, private router: Router) {    
  }

  createInstitute(instituteObj: any) {
    return this.http.post<any>(`${this.baseUrl}register`, instituteObj);
  }
}
