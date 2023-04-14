import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from 'src/app/services/department.service';

export interface DepartmentModel {  
  departmentID: string;
  departmentCode: string;
  departmentName: string;
  description: string;
  isActive: string;
}

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss']
})
export class DepartmentListComponent implements OnInit  {
  departmentModel!: DepartmentModel[];
  public institute: any = [];
  dataSource: any;
  displayedColumns: string[] = [
    'select',
    'departmentCode',
    'departmentName',
    'description',
    'isActive',
    'action'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  selection = new SelectionModel<DepartmentModel>(true, []);

  constructor(private service: DepartmentService, private router : Router, private toastr: ToastrService) {}

  ngOnInit() {
    this.getdepartmentList();
  }

  getdepartmentList() {
    this.dataSource = [];
    this.service.getDepartmentList().subscribe((res) => {
      console.log(res)
      this.departmentModel = res;
      this.dataSource = new MatTableDataSource(this.departmentModel);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  FilterChanged(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue;
  }

  FunctionEdit(departmentID: any) {
    this.router.navigate(["LMS/department"], {
      queryParams: { data: departmentID },
    });
  }
  FunctionDelete(departmentID: any) {  
    this.service.deleteDepartment(departmentID).subscribe({
      next: (res) => {
        this.toastr.success(res[0].message, 'SUCCESS',{
          timeOut: 3000,
        });
        this.getdepartmentList();
      },
      error: (err) => {
        //alert(err?.error.message);
        this.toastr.error(err?.error[0].message, 'ERROR', {
          timeOut: 3000,
        }); 
      },
    });

   
  }

  onDataToggled(data: DepartmentModel) {
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

  navigateCreateDepartment() {
    this.router.navigate(['LMS/department']);
  }
}
