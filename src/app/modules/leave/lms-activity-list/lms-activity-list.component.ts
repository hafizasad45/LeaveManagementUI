import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LMSActivitiesService } from 'src/app/services/lms-activities.service';

export interface LMS_ActivityModel {  
  lms_ActivityID: string;
  lms_ActivityCode: string;
  lms_ActivityName: string;
  lms_ActivityFriendlyName: string;
  isActive: string;
}

@Component({
  selector: 'app-lms-activity-list',
  templateUrl: './lms-activity-list.component.html',
  styleUrls: ['./lms-activity-list.component.scss']
})
export class LmsActivityListComponent {
  LMS_ActivityModel!: LMS_ActivityModel[];
  public institute: any = [];
  dataSource: any;
  displayedColumns: string[] = [
    'select',
    'lmS_ActivityName',
    'lmS_ActivityFriendlyName',
    'subjectForEmail',
    'isActive',
    'action'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  selection = new SelectionModel<LMS_ActivityModel>(true, []);

  constructor(private service: LMSActivitiesService, private router : Router, private toastr: ToastrService) {}

  ngOnInit() {
    this.getLMS_ActivityList();
  }

  getLMS_ActivityList() {
    this.dataSource = [];
    this.service.getLMS_ActivityList().subscribe((res) => {
      this.LMS_ActivityModel = res;
      this.dataSource = new MatTableDataSource(this.LMS_ActivityModel);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  FilterChanged(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue;
  }

  FunctionEdit(lmS_ActivityID: any) {
    this.router.navigate(["LMS/lms_Activity"], {
      queryParams: { data: lmS_ActivityID },
    });
  }
  FunctionDelete(lmS_ActivityID: any) {  
    this.service.deleteLMS_Activity(lmS_ActivityID).subscribe({
      next: (res) => {
        this.toastr.success(res[0].message, 'SUCCESS',{
          timeOut: 3000,
        });
        this.getLMS_ActivityList();
      },
      error: (err) => {
        //alert(err?.error.message);
        this.toastr.error(err?.error[0].message, 'ERROR', {
          timeOut: 3000,
        }); 
      },
    });

   
  }

  onDataToggled(data: LMS_ActivityModel) {
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

  navigateCreateLMS_Activity() {
    this.router.navigate(['LMS/lms_Activity']);
  }
}
