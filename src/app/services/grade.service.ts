import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  private baseUrl: string = environment.baseUrl + 'Grade/';


  constructor(private http: HttpClient, private router: Router) {    
  }

  createGrade(gradeObj: any) {
    return this.http.post<any>(`${this.baseUrl}Grade`, gradeObj);
  }

  updateGrade(gradeObj: any) {
    return this.http.put<any>(`${this.baseUrl}Grade`, gradeObj);
  }

  getGradeList() {
    return this.http.get<any>(`${this.baseUrl}Grade`);
  }

  getGradeByID(gradeID : number) {
    return this.http.get<any>(`${this.baseUrl}Grade/${gradeID}`);
  }

  deleteGrade(gradeID : any) {
    return this.http.delete<any>(`${this.baseUrl}Grade/${gradeID}`);
  }
}
