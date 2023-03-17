import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';


export interface UsersModel {
  firstName: string;
  lastName: string;
  userName: string;
  role: string;
  email: string;
}

@Component({
  selector: 'app-institute-list',
  templateUrl: './institute-list.component.html'
})
export class InstituteListComponent implements OnInit  {

  userModel!: UsersModel[];
  public users: any = [];
  dataSource: any;
  displayedColumns: string[] = [
    'select',
    'loginID',
    'role',
    'effectiveDate',
    'action',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  selection = new SelectionModel<UsersModel>(true, []);

  constructor(private api: ApiService, private router : Router) {}

  ngOnInit() {
    this.api.getUsers().subscribe((res) => {
      console.log(res)
      this.userModel = res;
      this.dataSource = new MatTableDataSource(this.userModel);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  FilterChanged(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue;
  }

  FunctionEdit(email: any) {
    console.log(email);
  }

  onDataToggled(data: UsersModel) {
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

  navigateCreateUser() {
    this.router.navigate(['LMS/institute']);
  }

}
