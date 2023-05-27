import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { EmployeeTypeService } from 'src/app/services/employee-type.service';

export interface EmployeeTypeModel {  
  employeeTypeID: string;
  employeeTypeCode: string;
  employeeTypeName: string;
  description: string;
  isActive: string;
}

@Component({
  selector: 'app-employee-type-list',
  templateUrl: './employee-type-list.component.html',
  styleUrls: ['./employee-type-list.component.scss']
})
export class EmployeeTypeListComponent implements OnInit {
  employeeTypeModel!: EmployeeTypeModel[];
  dataSource: any;
  displayedColumns: string[] = [
    'select',
    'employeeTypeCode',
    'employeeTypeName',
    'description',
    'isActive',
    'action'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  selection = new SelectionModel<EmployeeTypeModel>(true, []);

  constructor(private service: EmployeeTypeService, private router : Router, private toastr: ToastrService,
              private ngxService: NgxUiLoaderService
             ) {}

  ngOnInit() {
    this.ngxService.start();
    this.getemployeeTypeList();
    this.ngxService.stop();
  }

  getemployeeTypeList() {
    this.dataSource = [];
    this.service.getEmployeeTypeList().subscribe((res) => {
      this.employeeTypeModel = res;
      this.dataSource = new MatTableDataSource(this.employeeTypeModel);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  FilterChanged(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue;
  }

  FunctionEdit(employeeTypeID: any) {
    this.router.navigate(["LMS/employeeType"], {
      queryParams: { data: employeeTypeID },
    });
  }
  FunctionDelete(employeeTypeID: any) {  
    this.ngxService.start();
    this.service.deleteEmployeeType(employeeTypeID).subscribe({
      next: (res) => {
        this.toastr.success(res[0].message, 'SUCCESS',{
          timeOut: 3000,
        });
        this.getemployeeTypeList();
      },
      error: (err) => {
        //alert(err?.error.message);
        this.toastr.error(err?.error[0].message, 'ERROR', {
          timeOut: 3000,
        }); 
      },
    });
    this.ngxService.stop();
   
  }

  onDataToggled(data: EmployeeTypeModel) {
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

  navigateCreateEmployeeType() {
    this.router.navigate(['LMS/employeeType']);
  }
}
