import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervalTimerSaveDialogComponent } from './interval-timer-save-dialog.component';

describe('IntervalTimerSaveDialogComponent', () => {
  let component: IntervalTimerSaveDialogComponent;
  let fixture: ComponentFixture<IntervalTimerSaveDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IntervalTimerSaveDialogComponent],
    });
    fixture = TestBed.createComponent(IntervalTimerSaveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
