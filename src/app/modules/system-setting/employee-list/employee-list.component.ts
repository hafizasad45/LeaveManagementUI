import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/services/employee.service';
import { faUser, faMessage, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { NgxUiLoaderService } from 'ngx-ui-loader';


export interface EmployeeModel { 
  employeeID : number;
  employeeCode : string;
  employeeName : string;
  instituteID : number;
  branchID : number;
  departmrntID : number;
  designationID : number;
  gradeID : number;
  employeeTypeID : number;
  email : string;
  address : string;
  mobile : string;
  supervisorID : number;
  leaveApprovalAuthority : number;
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

  constructor(private service: EmployeeService, private router : Router, private toastr: ToastrService,
              private ngxService: NgxUiLoaderService
             ) {}

  ngOnInit() {
    this.ngxService.start();
    this.getEmployeeList();
    this.ngxService.stop();
  }

  getEmployeeList() {
    this.dataSource = [];
    this.service.getEmployeeList().subscribe((res) => {
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
    this.ngxService.start();
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
    this.ngxService.stop();
   
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
