import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/services/api.service';
import { InstituteService } from 'src/app/services/institute.service';


export interface InstituteModel {
  instituteID: number;
  instituteCode: string;
  instituteName: string;
  description: string;
  isActive: string;
}

@Component({
  selector: 'app-institute-list',
  templateUrl: './institute-list.component.html',
  styleUrls: ['./institute-list.component.scss']
})
export class InstituteListComponent implements OnInit  {

  instituteModel!: InstituteModel[];
  public institute: any = [];
  dataSource: any;
  displayedColumns: string[] = [
    'select',
    'instituteCode',
    'instituteName',
    'description',
    'isActive',
    'action'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  selection = new SelectionModel<InstituteModel>(true, []);

  constructor(private service: InstituteService, private router : Router, private toastr: ToastrService, 
              private ngxService: NgxUiLoaderService
             ) {}

  ngOnInit() {
    this.ngxService.start();
    this.getInstituteList();
    this.ngxService.stop();
  }

  getInstituteList() {
    this.dataSource = [];
    this.service.getInstituteList().subscribe((res) => {
      console.log(res)
      this.instituteModel = res;
      this.dataSource = new MatTableDataSource(this.instituteModel);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  FilterChanged(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue;
  }

  FunctionEdit(instituteID: any) {
    //console.log(instituteID);
   // this.router.navigate(['LMS/institute']);
    this.router.navigate(["LMS/institute"], {
      queryParams: { data: instituteID },
    });
  }
  FunctionDelete(instituteID: any) {
    console.log(instituteID);    
    this.service.deleteInstitute(instituteID).subscribe({
      next: (res) => {
        this.toastr.success(res[0].message, 'SUCCESS',{
          timeOut: 3000,
        });
        this.getInstituteList();
      },
      error: (err) => {
        //alert(err?.error.message);
        this.toastr.error(err?.error[0].message, 'ERROR', {
          timeOut: 3000,
        }); 
      },
    });

   
  }

  onDataToggled(data: InstituteModel) {
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

  navigateCreateInstitute() {
    this.router.navigate(['LMS/institute']);
  }

}
