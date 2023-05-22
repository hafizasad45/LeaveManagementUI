import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DesignationService } from 'src/app/services/designation.service';


export interface DesignationModel {  
  designationID: string;
  designationCode: string;
  designationName: string;
  description: string;
  isActive: string;
}

@Component({
  selector: 'app-designation-list',
  templateUrl: './designation-list.component.html',
  styleUrls: ['./designation-list.component.scss']
})
export class DesignationListComponent implements OnInit  {
  designationModel!: DesignationModel[];
  public institute: any = [];
  dataSource: any;
  displayedColumns: string[] = [
    'select',
    'designationCode',
    'designationName',
    'description',
    'isActive',
    'action'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  selection = new SelectionModel<DesignationModel>(true, []);

  constructor(private service: DesignationService, private router : Router, private toastr: ToastrService,
              private ngxService: NgxUiLoaderService
             ) {}

  ngOnInit() {
    this.ngxService.start();
    this.getDesignationList();
    this.ngxService.stop();
  }

  getDesignationList() {
    this.dataSource = [];
    this.service.getDesignationList().subscribe((res) => {
      console.log(res)
      this.designationModel = res;
      this.dataSource = new MatTableDataSource(this.designationModel);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  FilterChanged(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue;
  }

  FunctionEdit(designationID: any) {
    this.router.navigate(["LMS/designation"], {
      queryParams: { data: designationID },
    });
  }
  FunctionDelete(designationID: any) {  
    this.service.deleteDesignation(designationID).subscribe({
      next: (res) => {
        this.toastr.success(res[0].message, 'SUCCESS',{
          timeOut: 3000,
        });
        this.getDesignationList();
      },
      error: (err) => {
        //alert(err?.error.message);
        this.toastr.error(err?.error[0].message, 'ERROR', {
          timeOut: 3000,
        }); 
      },
    });

   
  }

  onDataToggled(data: DesignationModel) {
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

  navigateCreateDesignation() {
    this.router.navigate(['LMS/designation']);
  }
}
