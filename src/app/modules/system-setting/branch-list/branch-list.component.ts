import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BranchService } from 'src/app/services/branch.service';


export interface BranchModel {  
  branchID: string;
  branchCode: string;
  branchName: string;
  description: string;
  isActive: string;
  instituteID: number;
  instituteName: string;
}

@Component({
  selector: 'app-branch-list',
  templateUrl: './branch-list.component.html',
  styleUrls: ['./branch-list.component.scss']
})
export class BranchListComponent implements OnInit {
  branchModel!: BranchModel[];
  public institute: any = [];
  dataSource: any;
  displayedColumns: string[] = [
    'select',
    'branchCode',
    'branchName',
    'description',
    'isActive',
    'instituteName',
    'action'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  selection = new SelectionModel<BranchModel>(true, []);

  constructor(private service: BranchService, private router : Router, private toastr: ToastrService) {}

  ngOnInit() {
    this.getBranchList();
  }

  getBranchList() {
    this.dataSource = [];
    this.service.getBranchList().subscribe((res) => {
      console.log(res)
      this.branchModel = res;
      this.dataSource = new MatTableDataSource(this.branchModel);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  FilterChanged(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue;
  }

  FunctionEdit(branchID: any) {
    this.router.navigate(["LMS/branch"], {
      queryParams: { data: branchID },
    });
  }
  FunctionDelete(branchID: any) {  
    this.service.deleteBranch(branchID).subscribe({
      next: (res) => {
        this.toastr.success(res[0].message, 'SUCCESS',{
          timeOut: 3000,
        });
        this.getBranchList();
      },
      error: (err) => {
        //alert(err?.error.message);
        this.toastr.error(err?.error[0].message, 'ERROR', {
          timeOut: 3000,
        }); 
      },
    });

   
  }

  onDataToggled(data: BranchModel) {
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

  navigateCreateBranch() {
    this.router.navigate(['LMS/institute']);
  }
}
