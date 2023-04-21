import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GradeService } from 'src/app/services/grade.service';


export interface GradeModel {  
  gradeID: string;
  gradeCode: string;
  gradeName: string;
  description: string;
  isActive: string;
}

@Component({
  selector: 'app-grade-list',
  templateUrl: './grade-list.component.html',
  styleUrls: ['./grade-list.component.scss']
})
export class GradeListComponent implements OnInit {
  gradeModel!: GradeModel[];
  public institute: any = [];
  dataSource: any;
  displayedColumns: string[] = [
    'select',
    'gradeCode',
    'gradeName',
    'description',
    'isActive',
    'action'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  selection = new SelectionModel<GradeModel>(true, []);

  constructor(private service: GradeService, private router : Router, private toastr: ToastrService) {}

  ngOnInit() {
    this.getgradeList();
  }

  getgradeList() {
    this.dataSource = [];
    this.service.getGradeList().subscribe((res) => {
      console.log(res)
      this.gradeModel = res;
      this.dataSource = new MatTableDataSource(this.gradeModel);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  FilterChanged(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue;
  }

  FunctionEdit(gradeID: any) {
    this.router.navigate(["LMS/grade"], {
      queryParams: { data: gradeID },
    });
  }
  FunctionDelete(gradeID: any) {  
    this.service.deleteGrade(gradeID).subscribe({
      next: (res) => {
        this.toastr.success(res[0].message, 'SUCCESS',{
          timeOut: 3000,
        });
        this.getgradeList();
      },
      error: (err) => {
        //alert(err?.error.message);
        this.toastr.error(err?.error[0].message, 'ERROR', {
          timeOut: 3000,
        }); 
      },
    });

   
  }

  onDataToggled(data: GradeModel) {
    this.selection.toggle(data);
  }

  isAllSelected() {
    return this.selection.selected?.length === this.dataSource.data?.length;
  }

  toggleAll() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.selection.select(...this.dataSource.data);
    }
  }

  navigateCreateGrade() {
    this.router.navigate(['LMS/grade']);
  }
}
