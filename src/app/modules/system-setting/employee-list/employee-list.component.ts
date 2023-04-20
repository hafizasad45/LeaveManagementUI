import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/services/employee.service';


export interface EmployeeModel { 
  EmployeeID : number;
  EmployeeCode : string;
  EmployeeName : string;
  InstituteID : number;
  BranchID : number;
  DepartmrntID : number;
  DesignationID : number;
  GradeID : number;
  EmployeeTypeID : number;
  Email : string;
  Address : string;
  Mobile : string;
  SupervisorID : number;
  LeaveApprovalAuthority : number;
}

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent {
  employeeModel!: EmployeeModel[];
  public institute: any = [];
  dataSource: any;
  displayedColumns: string[] = [
    'select',
    'employeeCode',
    'employeeName',
    'branchName',
    'departmentName',
    'designationName',
    'action'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  selection = new SelectionModel<EmployeeModel>(true, []);

  constructor(private service: EmployeeService, private router : Router, private toastr: ToastrService) {}

  ngOnInit() {
    this.getEmployeeList();
  }

  getEmployeeList() {
    this.dataSource = [];
    this.service.getEmployeeList().subscribe((res) => {
      console.log(res)
      this.employeeModel = res;
      this.dataSource = new MatTableDataSource(this.employeeModel);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  FilterChanged(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue;
  }

  FunctionEdit(EmployeeID: any) {
    this.router.navigate(["LMS/employee"], {
      queryParams: { data: EmployeeID },
    });
  }
  FunctionDelete(EmployeeID: any) {  
    this.service.deleteEmployee(EmployeeID).subscribe({
      next: (res) => {
        this.toastr.success(res[0].message, 'SUCCESS',{
          timeOut: 3000,
        });
        this.getEmployeeList();
      },
      error: (err) => {
        //alert(err?.error.message);
        this.toastr.error(err?.error[0].message, 'ERROR', {
          timeOut: 3000,
        }); 
      },
    });

   
  }

  onDataToggled(data: EmployeeModel) {
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

  navigateCreateEmployee() {
    this.router.navigate(['LMS/employee']);
  }
}
