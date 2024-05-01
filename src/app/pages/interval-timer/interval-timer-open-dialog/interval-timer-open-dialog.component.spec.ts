import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervalTimerOpenDialogComponent } from './interval-timer-open-dialog.component';

describe('IntervalTimerOpenDialogComponent', () => {
  let component: IntervalTimerOpenDialogComponent;
  let fixture: ComponentFixture<IntervalTimerOpenDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IntervalTimerOpenDialogComponent],
    });
    fixture = TestBed.createComponent(IntervalTimerOpenDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
