import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LmsActivityListComponent } from './lms-activity-list.component';

describe('LmsActivityListComponent', () => {
  let component: LmsActivityListComponent;
  let fixture: ComponentFixture<LmsActivityListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LmsActivityListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LmsActivityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
