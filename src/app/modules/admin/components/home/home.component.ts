import { Component, OnInit } from '@angular/core';

import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public users: any = [];
  displayedColumns: string[] = [
    'id',
    'password',
    'firstName',
    'lastName',
    'userName',
    'role',
    'email',
  ];
  dataSource = new MatTableDataSource();

  constructor(private _liveAnnouncer: LiveAnnouncer, private api: ApiService) {}

  ngOnInit() {
    this.api.getUsers().subscribe((res) => {
      this.users = res;
    });
    this.dataSource = new MatTableDataSource(this.users);
    console.log(this.dataSource);
  }

  //@ViewChild(MatSort) sort: MatSort;
  //@ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatSort) sort = new MatSort();

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
