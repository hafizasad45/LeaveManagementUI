import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LmsActivityComponent } from './lms-activity.component';

describe('LmsActivityComponent', () => {
  let component: LmsActivityComponent;
  let fixture: ComponentFixture<LmsActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LmsActivityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LmsActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
